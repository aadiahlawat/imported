async function fetchArticles (block,path,articlesPerPage,currentPage) {
    try {
    const offset=(currentPage-1)*articlesPerPage;
    let articlesPath=path+"?offset="+offset+"&limit="+articlesPerPage;
    const response = await fetch(articlesPath); // Replace with your JSON URL
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderData(block,path,articlesPerPage,currentPage,data);
} 
    catch (error) {
        return [];
    }
}

function renderData(block,path,articlesPerPage,currentPage,data)  
{  
    const articleWrapper = document.createElement('ul');
    articleWrapper.classList.add('articles-outer')
    const articles=data.data;
    const totalArticles=data.total;
    articleWrapper.setAttribute('data-totalArticles',totalArticles);

    // Render the list Articles
    articles.forEach(article => {

        const articleContent = document.createElement('li');

        const articleImageContainer=document.createElement('div');
        articleImage.classList.add('article-image-container');
        const articleImage = document.createElement('img'); // Create an img element
        articleImage.src = article.Image; // Set the image source (replace with your image URL)
        articleImage.alt = article.Title;

        articleImageContainer.appendChild(articleImage);
        articleContent.appendChild(articleImageContainer);
        

        const articleTitleContainer=document.createElement('div');
        articleTitleContainer.classList.add('article-title-container');
        const articleTitle = document.createElement('a'); // Create an img element
        articleTitle.href = article.Image; // Set the image source (replace with your image URL)
        articleTitle.textContent = article.Title.toLowerCase().replace(/\s+/g, '-');;

        articleTitleContainer.appendChild(articleTitle);
        articleContent.appendChild(articleTitleContainer);

        const articleDescriptionContainer=document.createElement('div');
        articleDescriptionContainer.classList.add('article-description-container');
        const articleDescription = document.createElement('a'); // Create an img element
        articleDescription.href = article.Image; // Set the image source (replace with your image URL)
        articleDescription.textContent = article.Title.toLowerCase().replace(/\s+/g, '-');;

        articleDescriptionContainer.appendChild(articleDescription);
        articleContent.appendChild(articleDescriptionContainer);
        articleWrapper.appendChild(articleContent);

    });
    block.querySelector('div').style.display = 'none'; ;
    const clearArticles=block.querySelector('ul');
    if(clearArticles)
    {
        block.querySelector('ul').remove();
    }
    block.prepend(articleWrapper);
}
function renderPagination(block,path,articlesPerPage,totalArticles,currentPage)
{
    const totalPages=Math.ceil(totalArticles/articlesPerPage);
    const pagination=document.createElement('ul');
    pagination.innerHTML='';
    for(let i=1;i<=totalPages;i++)
    {
        const li=document.createElement('li');
        li.textContent=i;
        //li.classList.add(i===currentPage ? 'active' : '');
        li.addEventListener('click',() =>{
            currentPage=i;
            paginate(block,path,articlesPerPage,totalArticles,currentPage);
        });
        pagination.appendChild(li);
    }
    block.append(pagination);
}
async function paginate(block,path,articlesPerPage,totalArticles,currentPage)
{
    fetchArticles(block,path,articlesPerPage,currentPage);
}
export default async function decorate(block) {
        let currentPage=1;
        const articlesPerPage=20;
        const link = block.querySelector('a');
        const path = link ? link.getAttribute('href') : block.textContent.trim();
        const articles=await fetchArticles(block,path,articlesPerPage,currentPage);
        const totalArticles=block.querySelector('ul').getAttribute('data-totalArticles');
        renderPagination(block,path,articlesPerPage,totalArticles,currentPage);
}