import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import PageWrapper from "../components/PageWrapper";
import PixelButton from "../components/PixelButton";
import PixelHeart from "../components/PixelHeart";
import GifDisplay from "../components/GifDisplay";
import { gifs } from "../assets";
import "./WelcomePage.css";

const WelcomePage = ({ onYes }) => {
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [buttonSize, setButtonSize] = useState({
    width: 120,
    height: 45,
  });
  const noButtonRef = useRef(null);
  const isMoving = useRef(false);
  const MARGIN = 25;

  const getViewportSize = useCallback(() => {
    if (window.visualViewport) {
      return {
        width: window.visualViewport.width,
        height: window.visualViewport.height,
      };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const updateButtonSize = useCallback(() => {
    const button = noButtonRef.current;
    if (!button) {
      return;
    }
    const rect = button.getBoundingClientRect();
    setButtonSize({
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateButtonSize();
    }, 100);

    window.addEventListener("resize", updateButtonSize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateButtonSize);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateButtonSize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateButtonSize);
      }
    };
  }, [updateButtonSize]);

  const getRandomPosition = useCallback(() => {
    const { width: viewportWidth, height: viewportHeight } = getViewportSize();

    const minX = MARGIN;
    const minY = MARGIN;
    const maxX = Math.max(minX, viewportWidth - buttonSize.width - MARGIN);
    const maxY = Math.max(minY, viewportHeight - buttonSize.height - MARGIN);

    const x = maxX > minX ? Math.random() * (maxX - minX) + minX : minX;
    const y = maxY > minY ? Math.random() * (maxY - minY) + minY : minY;

    return { x, y };
  }, [buttonSize, getViewportSize]);

  const moveNoButton = useCallback(() => {
    if (isMoving.current) {
      return;
    }

    isMoving.current = true;

    const newPosition = getRandomPosition();
    const { width: viewportWidth, height: viewportHeight } = getViewportSize();

    const maxX = Math.max(MARGIN, viewportWidth - buttonSize.width - MARGIN);
    const maxY = Math.max(MARGIN, viewportHeight - buttonSize.height - MARGIN);

    const safeX = Math.min(Math.max(newPosition.x, MARGIN), maxX);
    const safeY = Math.min(Math.max(newPosition.y, MARGIN), maxY);

    setNoButtonPosition({ x: safeX, y: safeY });

    setTimeout(() => {
      isMoving.current = false;
    }, 180);
  }, [buttonSize, getRandomPosition, getViewportSize]);

  useEffect(() => {
    if (!noButtonPosition) {
      return;
    }

    const keepButtonInsideViewport = () => {
      const { width: viewportWidth, height: viewportHeight } = getViewportSize();

      const maxX = Math.max(MARGIN, viewportWidth - buttonSize.width - MARGIN);
      const maxY = Math.max(MARGIN, viewportHeight - buttonSize.height - MARGIN);

      setNoButtonPosition((currentPosition) => {
        if (!currentPosition) {
          return currentPosition;
        }

        return {
          x: Math.min(Math.max(currentPosition.x, MARGIN), maxX),
          y: Math.min(Math.max(currentPosition.y, MARGIN), maxY),
        };
      });
    };

    window.addEventListener("resize", keepButtonInsideViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", keepButtonInsideViewport);
    }

    return () => {
      window.removeEventListener("resize", keepButtonInsideViewport);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", keepButtonInsideViewport);
      }
    };
  }, [noButtonPosition, buttonSize, getViewportSize]);

  const renderNoButton = () => {
    const noButton = (
      <div
        ref={noButtonRef}
        className={`no-button-wrapper ${noButtonPosition ? "no-button-wrapper--moved" : ""}`}
        style={
          noButtonPosition
            ? {
                position: "fixed",
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
              }
            : undefined
        }
        onMouseEnter={(event) => {
          event.preventDefault();
          moveNoButton();
        }}
        onTouchStart={(event) => {
          event.preventDefault();
          moveNoButton();
        }}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          moveNoButton();
        }}
      >
        <PixelButton variant="secondary" className="no-button">
          NO
        </PixelButton>
      </div>
    );

    if (noButtonPosition) {
      return createPortal(noButton, document.body);
    }

    return noButton;
  };

  return (
    <PageWrapper>
      <div className="welcome-content">
        <GifDisplay src={gifs.hello} alt="Cute welcome animation" />

        <h1 className="welcome-heading">
          Would You Make a Little Memory With Me?
        </h1>

        <div className="welcome-buttons">
          <PixelButton onClick={onYes} variant="primary">
            YES
            <PixelHeart size={16} color="currentColor" />
          </PixelButton>

          {renderNoButton()}
        </div>
      </div>
    </PageWrapper>
  );
};

export default WelcomePage;