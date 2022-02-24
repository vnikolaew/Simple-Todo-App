export type TodoItemPriority = 1 | 2 | 3 | 4;
export type StringPriority = "urgent" | "high" | "medium" | "low";

export class Priority {
   constructor(public prio: string) {}

   public static toNumber(priority: string): TodoItemPriority {
      switch (priority) {
         case "urgent":
            return 1;
         case "high":
            return 2;
         case "medium":
            return 3;
         case "low":
            return 4;
         default:
            return 4;
      }
   }

   public static toString(priority: number): StringPriority {
      switch (priority) {
         case 1:
            return "urgent";
         case 2:
            return "high";
         case 3:
            return "medium";
         case 4:
            return "low";
         default:
            return "low";
      }
   }
}

export abstract class TodoItemModel {
   public title: string;
   public description: string;
   public priority: string;

   constructor(title: string, description: string, priority: string) {
      this.title = title;
      this.description = description;
      this.priority = priority;
   }

   public toPrioNumber(priority: string): number {
      return Priority.toNumber(priority);
   }

   public toPrioString(priority: number): string {
      return Priority.toString(priority);
   }
}
