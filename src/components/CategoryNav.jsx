const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'burgers', name: 'Hamburguesas' },
  { id: 'fries', name: 'Papas' },
  { id: 'drinks', name: 'Refrescos' },
  { id: 'extras', name: 'Extras' },
];

const handleKeyDown = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fn();
  }
};

const CategoryNav = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="-mx-4 px-4 md:-mx-8 md:px-8 flex overflow-x-auto overflow-y-hidden overscroll-x-contain no-scrollbar py-2 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                onKeyDown={handleKeyDown(() => onSelectCategory(cat.id))}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                className={`whitespace-nowrap px-5 h-9 flex items-center justify-center rounded-full text-[14px] font-medium cursor-pointer transition-colors outline-none focus-visible:opacity-80 shrink-0 ${
                  isSelected
                    ? 'bg-[#1E1E1E] text-white'
                    : 'bg-[#F3F4F6] text-[#1E1E1E] hover:bg-[#ECECEE] active:bg-[#ECECEE]'
                }`}
              >
                {cat.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
