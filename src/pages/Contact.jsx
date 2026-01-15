import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-base-100 min-h-[60vh] py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-base-content/70 text-lg mb-8 text-center">
          Have a question, feedback, or partnership inquiry? Fill out the form
          below and we'll get back to you soon.
        </p>
        {submitted ? (
          <div className="alert alert-success mb-8">
            <span>
              Thank you for your message! We will respond as soon as possible.
            </span>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="textarea textarea-bordered w-full min-h-[120px]"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
