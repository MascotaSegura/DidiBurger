import fs from 'fs';
import path from 'path';

// Fix CartPanel.jsx
let cartPath = path.join('c:', 'Users', 'DELL', 'Documents', 'Food', 'src', 'components', 'CartPanel.jsx');
let cartContent = fs.readFileSync(cartPath, 'utf8');

// The error in CartPanel says "Expected corresponding JSX closing tag for 'motion.div'." Opened at 189.
// But wait, line 189 is in the cartItems map, wait no.
// Let's count motion.div opening and closing tags.
let openMotionDivs = (cartContent.match(/<motion\.div/g) || []).length;
let closeMotionDivs = (cartContent.match(/<\/motion\.div>/g) || []).length;
console.log(`CartPanel open: ${openMotionDivs}, close: ${closeMotionDivs}`);

if (openMotionDivs > closeMotionDivs) {
  // It's probably the end of CartItemComponent missing a closing tag, or the end of CartPanel missing a closing tag.
  // wait, in my previous replacement for CartItemComponent:
  // I replaced the end of the map with:
  //                    {cartItems.map((item) => (
  //                      <CartItemComponent key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
  //                    ))}
  // Let's replace the whole file with a corrected version if needed, or just fix it.
}

// Fix ChatPanel.jsx
let chatPath = path.join('c:', 'Users', 'DELL', 'Documents', 'Food', 'src', 'components', 'ChatPanel.jsx');
let chatContent = fs.readFileSync(chatPath, 'utf8');
let chatOpenDivs = (chatContent.match(/<div/g) || []).length;
let chatCloseDivs = (chatContent.match(/<\/div>/g) || []).length;
console.log(`ChatPanel div open: ${chatOpenDivs}, close: ${chatCloseDivs}`);
let chatOpenMotion = (chatContent.match(/<motion\.div/g) || []).length;
let chatCloseMotion = (chatContent.match(/<\/motion\.div>/g) || []).length;
console.log(`ChatPanel motion open: ${chatOpenMotion}, close: ${chatCloseMotion}`);

// In ChatPanel, the script replaced `</div> </div> </div>` at the end with `</div> </motion.div> </motion.div>`, 
// but wait, `ChatPanel` only had TWO closing divs at the end!
// Let's view the end of ChatPanel.jsx.
