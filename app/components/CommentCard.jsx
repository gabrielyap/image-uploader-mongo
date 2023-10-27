import React, { useState } from 'react';

export default function CommentCard({ comment }) {


  return (
    <div>
      <div class="flex-1 bg-gray-200 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong className = "text-green-600">{comment.author}</strong> <span class="text-xs text-gray-400">3:34 PM</span>
        <p class="text-xs sm:text-sm">
          {comment.content}
        </p>
      </div>
    </div>

  );
};
