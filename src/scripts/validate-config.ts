import { agents } from "../config/agents";
import { taskToAgent } from "../config/routing";

function validateAgents() {
  for (const [agentName, agent] of Object.entries(agents)) {
    if (agent.name !== agentName) {
      throw new Error(
        `Agent key "${agentName}" does not match agent.name "${agent.name}".`,
      );
    }

    if (!agent.model?.model) {
      throw new Error(`Agent "${agentName}" is missing a model.`);
    }

    if (!agent.permissions.length) {
      throw new Error(`Agent "${agentName}" has no permissions defined.`);
    }
  }
}

function validateRouting() {
  for (const [task, agentName] of Object.entries(taskToAgent)) {
    const agent = agents[agentName];

    if (!agent) {
      throw new Error(`Task "${task}" points to missing agent "${agentName}".`);
    }

    if (agent.task !== task) {
      throw new Error(
        `Task "${task}" points to agent "${agentName}", but that agent is configured for task "${agent.task}".`,
      );
    }
  }
}

function main() {
  validateAgents();
  validateRouting();

  console.log("Config validation passed.");
}

main();
