import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark";
          size?: "normal" | "compact" | "invisible";
          tabindex?: number;
          badge?: "bottomright" | "bottomleft" | "inline";
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    loadRecaptchaScript(() => {
      if (!window.grecaptcha || !recaptchaRef.current) return;

      if (widgetId.current !== null) {
        window.grecaptcha.reset(widgetId.current);
      } else {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: "6Ldn9mArAAAAAPvZygRBG7Ja3XR289mGjiS7A1Nd",
        });
      }
    });
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const recaptchaResponse = window.grecaptcha?.getResponse(widgetId.current!);
    if (!recaptchaResponse) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    emailjs
      .sendForm(
        "service_b7tm2tj",
        "template_a2pbvep",
        form.current,
        "MbM-Jmt0QIkA71a6v"
      )
      .then(() => {
        setSent(true);
        setStatus(null);
        window.grecaptcha?.reset(widgetId.current!);
      })
      .catch(() => {
        setStatus("❌ Failed to send message. Please try again.");
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
      <div
        className="max-w-7xl w-full flex flex-col md:flex-row gap-x-12 items-center justify-center px-4 md:px-0 -mt-12"
        // -mt-12 moves it up 3rem, adjust if needed
      >
        {/* Left text */}
        <section className="w-full md:w-5/12 flex flex-col justify-center items-center text-center mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl mb-6">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-md text-green-500">
            Have something you want to speak to me about, fill out the form below and I'll get back to you ASAP.
          </p>
        </section>

        {/* Right form */}
        <div className="bg-white rounded-xl shadow-xl p-8 w-full md:w-6/12 text-black">
          {!sent ? (
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

              <input
                type="hidden"
                name="time"
                value={new Date().toLocaleString()}
              />

              {/* reCAPTCHA placeholder */}
              <div ref={recaptchaRef} className="g-recaptcha"></div>

              <button
                type="submit"
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
              >
                Send
              </button>
            </form>
          ) : (
            <p className="mt-4 text-center text-green-600 font-semibold">
              ✅ Message sent successfully! Thank you for contacting me.
            </p>
          )}

          {status && !sent && (
            <p
              className={`mt-4 text-center ${
                status.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

function loadRecaptchaScript(callback: () => void) {
  if (document.getElementById("recaptcha-script")) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.id = "recaptcha-script";
  script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
  script.async = true;
  script.defer = true;
  script.onload = () => callback();
  document.body.appendChild(script);
}

export default Contact;
