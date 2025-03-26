import React, { useEffect } from "react";
import "./ReadingList.css"; // Optional: For custom styles

const GoodreadsWidget = ({ title, shelf, widgetId }) => {
  useEffect(() => {
    const container = document.getElementById(`goodreads-widget-${widgetId}`);
    if (!container) return;

    // Clear any existing script to avoid duplicates
    container.innerHTML = "";

    // Create a new script element
    const script = document.createElement("script");
    script.src = `https://www.goodreads.com/review/custom_widget/179491773.avniscribbles's%20bookshelf:%20${shelf}?cover_position=left&cover_size=small&num_books=5&order=a&shelf=${shelf}&show_author=1&show_cover=1&show_rating=1&show_review=1&show_tags=1&show_title=1&sort=date_added&widget_bg_color=FFFFFF&widget_bg_transparent=&widget_border_width=1&widget_id=${widgetId}&widget_text_color=000000&widget_title_size=medium&widget_width=medium`;
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    // Append the script inside the container
    container.appendChild(script);
  }, [shelf, widgetId]); // Re-run when `shelf` or `widgetId` changes

  return (
    <div className="goodreads-section">
      <h2>{title}</h2>
      <div id={`goodreads-widget-${widgetId}`} className="goodreads-widget-container"></div>
    </div>
  );
};

const ReadingList = () => {
  return (
    <div className="reading-list">
      <GoodreadsWidget title="📖 Currently Reading" shelf="currently-reading" widgetId="1742456824" />
      <GoodreadsWidget title="📚 To Read" shelf="to-read" widgetId="1742457222" />
    </div>
  );
};

export default ReadingList;
