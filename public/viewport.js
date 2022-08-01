setTimeout(
  () =>
    document
      .querySelector("meta[name=viewport]")
      .setAttribute(
        "content",
        "height=" +
          screen.height * 0.9 +
          "px, width=device-width, initial-scale=1.0"
      ),
  300
);
