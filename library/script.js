let bookspace = document.querySelector("#bookspace");
let pagecontainer = document.querySelector(".pagecontainer");
let searchbar = document.querySelector(".inputtype");
let sortbutton = document.querySelector(".sort");

let tglbtn=document.querySelector(".toggleview-list")

let allbooks = [];
let filteredbooks = [];

const booksperpage = 9;

const createpageno = (pages) => {
    for (let i = 0; i < pages; i++) {
        let pageno = document.createElement("div");
        pageno.classList.add("page");
        pageno.innerText = i + 1;
        pagecontainer.appendChild(pageno);
    }

    return [...pagecontainer.querySelectorAll(".page")];
};

const generatebookinfo = (container, bookinfo) => {
    let title = bookinfo.title;
    let authorsarray = bookinfo.authors;
    let publisher = bookinfo.publisher;
    let thumbnail = bookinfo.imageLinks?.thumbnail || "";
    let publishedDate = bookinfo.publishedDate;

    let thumbnailcontainer = document.createElement("div");
    thumbnailcontainer.classList.add("thumbnail");
    thumbnailcontainer.style.backgroundImage = `url('${thumbnail}')`;
    container.appendChild(thumbnailcontainer);

    let infodiv = document.createElement("div");
    infodiv.classList.add("infodiv");
    infodiv.innerHTML = `
        <span style="font-size:larger;color:black" class="forsorting">Title: ${title}</span>
        <span>Author: ${authorsarray.join(",")}</span>
        <span style="color:black">Publisher: ${publisher}</span>
        <span>Published Date: ${publishedDate}</span>
    `;
    container.appendChild(infodiv);
};

const generategrids = (pageno, booksdata) => {
    let starting_book_index = (pageno - 1) * booksperpage;
    let ending_book_index = Math.min(starting_book_index + booksperpage - 1, booksdata.length - 1);
    bookspace.innerHTML = "";
    for (let index = starting_book_index; index <= ending_book_index; index++) {
        let grid = document.createElement("div");
        grid.classList.add("grid");
        bookspace.appendChild(grid);

        generatebookinfo(grid, booksdata[index].volumeInfo);
    }
};

const createlibrary = (booksdata) => {
    let pages = Math.ceil(booksdata.length / booksperpage);
    let arrayofpages = createpageno(pages);
    generategrids(1, booksdata);

    arrayofpages.forEach((pageno) => {
        pageno.addEventListener("click", () => {
            generategrids(parseInt(pageno.innerHTML), booksdata);
        });
    });
};

const searchbarfilter = (filtercondition) => {
    filteredbooks = allbooks.filter((book) => 
            book.volumeInfo.title.toLowerCase().includes(filtercondition) ||
            book.volumeInfo.authors.join(" ").toLowerCase().includes(filtercondition) ||
            book.volumeInfo.publisher.toLowerCase().includes(filtercondition)
        );
    bookspace.innerHTML = "";
    pagecontainer.innerHTML = "";
    createlibrary(filteredbooks);
};

searchbar.addEventListener("input", () => {
    let filtercondition = searchbar.value.toLowerCase();
    searchbarfilter(filtercondition);
});

sortbutton.addEventListener("change", (e) => {

    switch (e.target.value) {
        case "ascending":
            filteredbooks.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            break;
        case "descending":
            filteredbooks.sort((a, b) => b.volumeInfo.title.localeCompare(a.volumeInfo.title));
            break;
        case "date":
            filteredbooks.sort((a, b) => b.volumeInfo.publishedDate.localeCompare(a.volumeInfo.publishedDate));
            break;
        default:
            break;
    }

    bookspace.innerHTML = "";
    pagecontainer.innerHTML = "";
    createlibrary(filteredbooks);
});

tglbtn.addEventListener("click",()=>{
    bookspace.classList.toggle("bookspace-grid")
    bookspace.classList.toggle("bookspace-list")
    tglbtn.classList.toggle("toggleview-grid")
    tglbtn.classList.toggle("toggleview-list")

})

function render(obj) {
    allbooks = obj.data.data;
    filteredbooks = [...allbooks];
    createlibrary(filteredbooks);
}

const data = fetch("https://api.freeapi.app/api/v1/public/books")
    .then((res) => res.json())
    .then(render)
    .catch((err) => {
        console.log("Error in fetching", err);
    });
