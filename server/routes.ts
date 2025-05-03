import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Add timestamp
      const contactData = {
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      
      // Save to storage
      const savedMessage = await storage.createContactMessage(contactData);
      
      // Return success
      res.status(201).json({
        message: "Message sent successfully",
        data: savedMessage,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: validationError.details 
        });
      }
      
      // Handle other errors
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
