// Initialize books from LocalStorage or fallback to empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
    updateStats();
}

function addBook() {
    const bookName = document.getElementById('bookName').value.trim();
    const authorName = document.getElementById('authorName').value.trim();
    const bookDescription = document.getElementById('bookDescription').value.trim();
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);

    if (bookName && authorName && bookDescription && !isNaN(pagesNumber) && pagesNumber > 0) {
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };
        books.push(book);
        saveBooks();
        showbooks();
        clearInputs();
        resetFormState();
    } else {
        alert('Please fill in all fields correctly. Pages must be a positive number.');
    }
}

function showbooks() {
    const booksContainer = document.getElementById('books');
    if (!booksContainer) return;

    if (books.length === 0) {
        booksContainer.innerHTML = '';
        updateStats();
        return;
    }

    const booksDiv = books.map((book, index) => `
        <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between group">
            <div class="space-y-3">
                <div class="flex items-start justify-between">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Book #${index + 1}
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-slate-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        ${book.pagesNumber} pages
                    </span>
                </div>
                <div>
                    <h3 class="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1" title="${book.name}">${book.name}</h3>
                    <p class="text-xs text-indigo-300 font-medium mt-0.5">by ${book.authorName}</p>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 min-h-[4.5rem]" title="${book.bookDescription}">${book.bookDescription}</p>
            </div>
            
            <div class="mt-5 pt-4 border-t border-slate-700/50 flex items-center justify-end gap-2.5">
                <button onclick="editbook(${index})" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/30 rounded-lg transition-all duration-150 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 20.04a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Edit
                </button>
                <button onclick="deletebook(${index})" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/30 rounded-lg transition-all duration-150 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    `);
    
    booksContainer.innerHTML = booksDiv.join('');
    updateStats();
}

function editbook(index) {
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;
    
    // Customize Form title & button to indicate edit mode
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    if (formTitle) {
        formTitle.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> Editing Book`;
    }
    if (submitBtn) {
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Save Changes
        `;
        submitBtn.className = "w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-[0.98] text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer";
    }

    books.splice(index, 1); // Remove old entry
    saveBooks();
    showbooks(); // Refresh list
}

function deletebook(index) {
    if (confirm(`Are you sure you want to delete "${books[index].name}"?`)) {
        books.splice(index, 1);
        saveBooks();
        showbooks();
    }
}

function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}

function resetFormState() {
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    if (formTitle) {
        formTitle.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span> Add New Book`;
    }
    if (submitBtn) {
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Book
        `;
        submitBtn.className = "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-150 text-sm flex items-center justify-center gap-2 cursor-pointer";
    }
}

function updateStats() {
    const totalBooks = books.length;
    const totalPages = books.reduce((sum, book) => sum + (book.pagesNumber || 0), 0);

    const totalBooksEl = document.getElementById('statTotalBooks');
    const totalPagesEl = document.getElementById('statTotalPages');
    const emptyStateEl = document.getElementById('emptyState');

    if (totalBooksEl) totalBooksEl.textContent = totalBooks;
    if (totalPagesEl) totalPagesEl.textContent = totalPages.toLocaleString();

    if (emptyStateEl) {
        if (totalBooks === 0) {
            emptyStateEl.classList.remove('hidden');
            emptyStateEl.classList.add('flex');
        } else {
            emptyStateEl.classList.remove('flex');
            emptyStateEl.classList.add('hidden');
        }
    }
}

// Initial Render and Stats Update
document.addEventListener('DOMContentLoaded', () => {
    showbooks();
});