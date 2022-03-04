export class ListTemplate {
	constructor (private tab: HTMLDivElement) {}
	
	render(taskName: string) {
		const segment = document.createElement("div");
		segment.className = "segment";
		
		const accordion = document.createElement("div");
		accordion.className = "accordion shrinked";
	
		if (this.tab.classList.contains("to-do-tasks")) {
	  	accordion.innerText = "Task - ";
		} else {
			accordion.innerText = "Completed - "
		}
		segment.append(accordion);
		
		const span = document.createElement("span");
		span.innerText = taskName;
		accordion.append(span);
		
		const actions = document.createElement("div");
		actions.className = "actions";
		segment.append(actions);
		
		const button = document.createElement("button");
		const input = document.createElement("input");

		if (this.tab.classList.contains("to-do-tasks")) {
		  input.setAttribute("type", "checkbox");
		  
		  button.setAttribute("type", "button");
		  
		  actions.append(input, button);
		} else {
		  button.setAttribute("type", "button");
		  
		  actions.append(button);
		}
		
		this.tab.append(segment);
		
		(accordion as HTMLDivElement).addEventListener("click", () => {
			accordion.classList.toggle("shrinked");
		});
		
		(button as HTMLButtonElement).addEventListener("click", () => {
			this.tab.removeChild(segment);
		});
	}
}