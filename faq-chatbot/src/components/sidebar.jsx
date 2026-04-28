
import React from "react";

const faqQuestions = [
  "What is MTS and MTO and the difference between them?",
  "What are the MRP master data?",
  "What is Backflush, the places where the backflush is used?",
  "After running the T-code MD04 Planned order isn't found on the stock requirement list?",
  "Why a planned order in an SAP system cannot be converted into a production order?",
  "What are the reasons of BOM Explosion in show overview tree in MD04?",
  "What do you mean if Production order created but not able to find the reservation slip in ZPP_RES?",
  "What are the reasons behind the production order not released?",
  "What is the reason if Quality lot not generated after releasing the production order?",
  "What is the reason in case of Inspection lot isn't released or in CRTD Mode?",
  "What is the reason behind if user facing the last operation confirmation issue during the production order confirmation?",
  "What do you understand by TECO?",
];

function Sidebar({ setSelectedQuestion }) {
  return (
    <div className="sidebar-scroll w-1/3 h-screen overflow-y-auto p-4 border-r 
bg-white text-black border-gray-200
dark:bg-[#0f172a] dark:text-gray-200 dark:border-white/5">
      <h2 className="text-lg font-semibold mb-6">FAQs</h2>

      <div className="space-y-3">
        {faqQuestions.map((q, index) => (
          <button
            key={index}
            onClick={() => setSelectedQuestion(q)}
            className="w-full text-left px-3 py-2 rounded-lg transition
bg-gray-100 hover:bg-gray-200 text-black
dark:bg-[#1f2937] dark:hover:bg-[#374151] dark:text-gray-200"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;