import projectsData from "../data/projects.json";
import type { Project } from "../types/project";

// TODO: once the backend is live, set this from an env var, e.g.
// const API_URL = import.meta.env.VITE_API_URL;

/**
 * Returns all projects.
 *
 * CURRENT: reads from local JSON (src/data/projects.json).
 * LATER: replace the body with a fetch call, e.g.
 *
 *   const res = await fetch(`${API_URL}/projects`);
 *   if (!res.ok) throw new Error("Failed to load projects");
 *   return res.json();
 */
export async function getProjects(): Promise<Project[]> {
  return projectsData as Project[];
}

/**
 * Returns a single project by slug, or undefined if not found.
 *
 * LATER: replace with `GET ${API_URL}/projects/${slug}`.
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

/**
 * Submits the contact form.
 *
 * CURRENT: no-op placeholder, just logs and resolves.
 * LATER: replace with `POST ${API_URL}/contact`.
 */
export interface ContactPayload {
  name: string;
  phone: string;
  message?: string;
}

export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean }> {
  console.info("[contact:mock]", payload);
  return { ok: true };
}
