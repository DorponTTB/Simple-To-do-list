import { ListTemplate } from "../../public/script/ListTemplate.js";

const tabSwitcher = document.querySelectorAll<HTMLAnchorElement>("nav a.item"),
	    tabs = document.querySelectorAll<HTMLDivElement>('section[aria-label^="organize"] > div');

tabSwitcher.forEach((ele: HTMLAnchorElement, index: number) => {
	ele.addEventListener("click", (e: Event) => {
		e.preventDefault();

		(document.querySelector("nav .active") as HTMLAnchorElement).classList.remove("active");
		(document.querySelector('section[aria-label^="organize"] > .active') as HTMLDivElement).classList.remove("active");

		ele.classList.add("active");
		tabs[index].classList.add("active");
	});
});

const newTaskForm = document.querySelector(".add-new-task form") as HTMLFormElement,
      newTask = document.querySelector(".add-new-task textarea") as HTMLTextAreaElement,
      todoTasksTab = document.querySelector(".to-do-tasks") as HTMLDivElement,
      completedTasksTab = document.querySelector(".completed-tasks") as HTMLDivElement;

function throwError(message: string) {
  const errorElement = document.querySelector(".error-message") as HTMLSpanElement;
  
  errorElement.innerText = message;
  errorElement.classList.add("visible");
  
  setTimeout(() => {
    errorElement.classList.remove("visible");
  }, 1600);
}

const listTemplate = new ListTemplate(todoTasksTab);

newTaskForm.addEventListener("submit", (e: Event) => {
	e.preventDefault();

	if (newTask.value === "") return throwError("Task cannot be empty!");
	if (newTask.value.replace(/\n| /g, "").length > 1200) return throwError("Your task is too long!");
	
	listTemplate.render(newTask.value.replace(/\n/g, " "));
	
	newTask.value = "";
});

const listTemplate2 = new ListTemplate(completedTasksTab);
	
todoTasksTab.addEventListener("click", (e) => {
	const checkbox = e.target as HTMLInputElement;
	
	if (checkbox.type !== "checkbox") return;
	
	checkbox.closest(".actions").style.backgroundPositionY = "-2.574rem, -0.03rem";
	
	const segment = checkbox.closest(".segment") as HTMLDivElement;
  
  setTimeout(() => {
  	listTemplate2.render((segment.querySelector(".accordion span") as HTMLSpanElement).innerText.replace(/\n/g, " "));
		
  	todoTasksTab!.removeChild(segment);
  }, 990);
});