"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import Image from "next/image";

interface MemoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  message: string;
}

export default function MemoryPopup({ isOpen, onClose, image, title, message }: MemoryPopupProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEsc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="popup-backdrop"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(26, 10, 16, 0.75)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "rgba(40, 20, 28, 0.95)",
              border: "1px solid rgba(244, 143, 177, 0.2)",
              borderRadius: "1.5rem",
              padding: "1.5rem",
              maxWidth: "420px",
              width: "90vw",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(244,143,177,0.1)",
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close popup"
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "rgba(244, 143, 177, 0.15)",
                border: "1px solid rgba(244, 143, 177, 0.2)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(244, 143, 177, 0.7)",
                fontSize: "1.1rem",
                zIndex: 10,
              }}
            >
              ×
            </button>

            {/* Photo */}
            <div
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                marginBottom: "1.25rem",
                aspectRatio: "4/3",
                position: "relative",
              }}
            >
              <Image
                src={image}
                alt={title}
                width={400}
                height={300}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(26,10,16,0.3) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-serif"
              style={{
                color: "#f8bbd0",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              {title}
            </h3>

            {/* Message */}
            <p
              className="font-sans"
              style={{
                color: "rgba(244, 143, 177, 0.6)",
                fontSize: "0.95rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
