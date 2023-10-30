import React, { useState } from 'react';
import Axios from 'axios';

export default function CommentCard({ comment, index, loginCredentials, viewImageId }) {
  
  return (
    <div>
      <div class="flex-1 bg-gray-200 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <div className="flex justify-between w-full">
          <div>
            <strong className="text-green-600">{comment.author}</strong>
            <span class="text-xs text-gray-400"> {comment.time}</span>
          </div>


          
        </div>

        <p class="text-xs sm:text-sm">
          {comment.content}
        </p>
      </div>
    </div>

  );
};
