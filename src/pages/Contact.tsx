import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const recaptchaValue = (window as any).grecaptcha?.getResponse();
    if (!recaptchaValue) {
      setStatus('Please complete the reCAPTCHA.');
      return;
    }

    emailjs
      .sendForm(
        'service_b7tm2tj',
        'template_a2pbvep',
        form.current,
        'MbM-Jmt0QIkA71a6v'
      )
      .then(() => {
        setStatus('✅ Message sent successfully!');
        (e.currentTarget as HTMLFormElement).reset();
        (window as any).grecaptcha?.reset();
      })
      .catch(() => {
        setStatus('❌ Failed to send message. Please try again.');
      });
  };

  return (
    <main
      style={{
        background: `linear-gradient(
          135deg,
          #2e3033 0%,
          #1f2124 70%,
          #141618 100%
        )`,
      }}
      className="min-h-screen flex items-center justify-center px-4 py-16 text-[#d4d4d4]"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg text-black">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Me</h1>
        <p className="mb-6 text-center">
          Have something you want to speak to me about, fill out the form below and i'll get back to you ASAP.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <div className="g-recaptcha" data-sitekey="6Ldn9mArAAAAAPvZygRBG7Ja3XR289mGjiS7A1Nd"></div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Send
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </main>
  );
};

export default Contact;
