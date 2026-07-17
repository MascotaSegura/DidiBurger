import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'OrdersPanel.jsx',
  'WalletPanel.jsx',
  'StoresPanel.jsx',
  'PromosPanel.jsx',
  'HelpPanel.jsx',
  'ChatPanel.jsx',
];

for (const file of files) {
  const filePath = path.join(__dirname, 'src', 'components', file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has framer-motion
  if (content.includes("framer-motion")) continue;

  // Add import
  content = content.replace(/import React(.*?);/, "import React$1;\nimport { motion } from 'framer-motion';");

  // Replace wrapper 1
  content = content.replace(
    /<div\s+className="fixed inset-0 h-\[100dvh\] w-screen z-50 flex items-end md:items-stretch justify-center md:justify-end bg-\[#1E1E1E\]\/40 md:p-0 overflow-hidden"/,
    `<motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      exit={{ opacity: 0 }}\n      className="fixed inset-0 h-[100dvh] w-screen z-50 flex items-end md:items-stretch justify-center md:justify-end bg-[#1E1E1E]/40 md:p-0 overflow-hidden"`
  );

  // Replace wrapper 2
  content = content.replace(
    /<div className="bg-white w-full h-full max-h-\[100dvh\] md:h-full max-w-\[480px\] flex flex-col md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none overflow-hidden relative animate-slide-up md:animate-slide-in-right isolate">/,
    `<motion.div \n        initial={{ y: "100%" }}\n        animate={{ y: 0 }}\n        exit={{ y: "100%" }}\n        transition={{ type: "spring", damping: 25, stiffness: 200 }}\n        drag="y"\n        dragConstraints={{ top: 0, bottom: 0 }}\n        dragElastic={{ top: 0, bottom: 0.5 }}\n        onDragEnd={(e, info) => {\n          if (info.offset.y > 100 || info.velocity.y > 500) {\n            onClose();\n          }\n        }}\n        className="bg-white w-full h-full max-h-[100dvh] md:h-full max-w-[480px] flex flex-col md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none overflow-hidden relative isolate">`
  );

  // Replace closing tags
  content = content.replace(
    /        <\/div>\n      <\/div>\n    <\/div>/,
    `        </div>\n      </motion.div>\n    </motion.div>`
  );
  
  // Alternative closing tags format
  content = content.replace(
    /      <\/div>\n    <\/div>/g,
    `      </motion.div>\n    </motion.div>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
