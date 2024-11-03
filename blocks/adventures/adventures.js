
/************  tabs code ****************/
const adventuresTabsList=document.querySelector(".adventures-tabs-list");
const adventuresTabsContent=document.querySelector(".adventures-tabs-content");
const adventuresTabsItems = adventuresTabsContent.querySelectorAll('.columns-wrapper');
const adventuresTabsFirst=adventuresTabsList.querySelector('p');
if(adventuresTabsFirst)
{
  adventuresTabsFirst.classList.add('active-tab');
}
const adventuresTabs=adventuresTabsList.querySelectorAll('p');
adventuresTabs.forEach((tab)=>
{
  tab.onclick=function()
  {
    const currentTabIndex=findTabIndex(adventuresTabs,tab);
    console.log("Current Tab Index:  "+ currentTabIndex);
    adventuresTabs.forEach(p => p.classList.remove('active-tab'));
    // Add the class to the currently clicked <p> element
    tab.classList.add('active-tab');
    toggleTabByIndex(adventuresTabsItems,currentTabIndex);
  }
});
// Function to find the index of a specific <p> tag
function findTabIndex(adventuresTabs,tab) {
  return Array.from(adventuresTabs).indexOf(tab);
}
// Function to toggle a tab  by index
function toggleTabByIndex(adventuresTabsItems,index) {
  console.log('Toggel tab index: '+index);
  if(index===0)
  {
    adventuresTabsItems.forEach((item, i) => {
          item.style.display = 'block'; // show all items
  });
  }
  else
  {
    const toggleTab=index-1;
    adventuresTabsItems.forEach((item, i) => {
      if (i === toggleTab) {
          item.style.display = 'block'; // Show the item
      } else {
          item.style.display = 'none'; // Hide other items
      }
  });
  }
}