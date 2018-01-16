export interface Task {
  name: String
  source: String
  target: String
}

export interface Config {
  tasks: Task[]
}
