import "./style.css";
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const serviceWrappers = document.querySelectorAll(
    '[data-wrapper="service-wrapper"]',
  );

  const serviceNames = document.querySelectorAll(
    '[data-service="service-name"]',
  );

  const marquees = document.querySelectorAll('[data-type="marquee-container"]');
  const marqueeContents = document.querySelectorAll(
    '[data-content="marquee-content"]',
  );
  const marqueeHighlights = document.querySelectorAll(
    '[data-type="marquee-highlight"]',
  );

  const marqueeDuration = 20;

  marquees.forEach((marquee, index) => {
    const marqueeContent = marqueeContents[index];
    const marqueeClone = marqueeContent.cloneNode(true);
    const marqueeContentAttributeValue =
      marqueeContent.getAttribute("data-content");

    marqueeClone.setAttribute("data-content", marqueeContentAttributeValue);

    marquee.appendChild(marqueeClone);
  });

  serviceWrappers.forEach((serviceWrapper, index) => {
    const serviceName = serviceNames[index];
    const marquee = marquees[index];
    const marqueeHighlight = marqueeHighlights[index];
    const tl = gsap.timeline();
    serviceWrapper.addEventListener("mouseenter", () => {
      tl.clear();
      tl.to(serviceName, {
        y: "-100%",
      });
      tl.to(
        marquee,
        {
          y: "-100%",
        },
        0,
      );
      tl.to(
        marqueeHighlight,
        {
          scale: 3,
          duration: 3,
          ease: "power4.out",
        },
        0,
      );
    });
    serviceWrapper.addEventListener("mouseleave", () => {
      tl.clear();
      tl.to(serviceName, { y: "0%" });
      tl.to(marquees, { y: "0%" }, 0);
      tl.to(
        marqueeHighlight,
        {
          scale: 1,
          ease: "power4.out",
        },
        0,
      );
    });
  });

  gsap.fromTo(
    '[data-content="marquee-content"]',
    {
      xPercent: 0,
    },
    {
      xPercent: -103,
      duration: marqueeDuration,
      ease: "none",
      repeat: -1,
    },
  );
});
