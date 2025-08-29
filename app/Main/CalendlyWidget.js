import { useEffect, useRef } from "react";

const CalendlyWidget = () => {
  const widgetRef = useRef();

  useEffect(() => {
    // Load Calendly script dynamically
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      if (window.Calendly && widgetRef.current) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/arceniktechnologies/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=9b92a2",
          parentElement: widgetRef.current,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div ref={widgetRef} className="calendly-inline-widget" />;
};

export default CalendlyWidget;
