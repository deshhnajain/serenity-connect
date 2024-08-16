const Testimonial = require('../models/Testimonials');

class TestimonialController {
  static async getApprovedTestimonials(req, res) {
    try {
      const testimonials = await Testimonial.find({ isVisible: true }).sort({ createdAt: -1 });
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials", error: error.message });
    }
  }

  static async submitTestimonial(req, res) {
    try {
      const { quote, author } = req.body;
      const newTestimonial = new Testimonial({ quote, author });
      await newTestimonial.save();
      res.status(201).json({ message: "Testimonial submitted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error submitting testimonial", error: error.message });
    }
  }

  static async getAllTestimonials(req, res) {
    try {
      const testimonials = await Testimonial.find().sort({ createdAt: -1 });
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials", error: error.message });
    }
  }

  static async toggleVisibility(req, res) {
    try {
      const { id } = req.params;
      console.log('Toggling visibility for testimonial:', id); // Add this line
      const testimonial = await Testimonial.findById(id);
      
      if (!testimonial) {
        console.log('Testimonial not found:', id); // Add this line
        return res.status(404).json({ message: "Testimonial not found" });
      }
  
      testimonial.isVisible = !testimonial.isVisible;
      await testimonial.save();
  
      console.log('Testimonial updated:', testimonial); // Add this line
      res.json({ message: "Testimonial visibility updated", testimonial });
    } catch (error) {
      console.error('Error in toggleVisibility:', error); // Add this line
      res.status(400).json({ message: "Error updating testimonial visibility", error: error.message });
    }
  }
  static async deleteTestimonial(req, res) {
    try {
      const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json({ message: "Testimonial deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting testimonial", error: error.message });
    }
  }
}

module.exports = TestimonialController;