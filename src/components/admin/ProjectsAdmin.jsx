'use client';

import { useEffect, useState } from 'react';
import { ImagePlus, Plus, Save, Trash2 } from 'lucide-react';
import { adminFetch, adminToken } from '../../lib/adminApi';
import { useUploadThing } from '../../lib/uploadthing';
import toast from '../../lib/toast';

const emptyProject = {
  title: '',
  category: '',
  description: '',
  linkUrl: '',
  stage: 'in-progress',
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [newProject, setNewProject] = useState(emptyProject);
  const [busy, setBusy] = useState('');

  // UploadThing calls /api/uploadthing with the admin JWT attached.
  const { startUpload } = useUploadThing('projectImage', {
    headers: async () => ({ Authorization: `Bearer ${await adminToken()}` }),
  });

  const load = async () => {
    try {
      const result = await adminFetch('/admin/content');
      setProjects(result.projects || []);
    } catch (error) {
      toast.error('Could not load projects', error.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const draftFor = (project) => drafts[project.id] || project;

  const updateDraft = (id, values) =>
    setDrafts((previous) => ({
      ...previous,
      [id]: { ...(previous[id] || projects.find((project) => project.id === id)), ...values },
    }));

  const saveProject = async (project) => {
    const draft = draftFor(project);
    setBusy(project.id);
    try {
      await adminFetch(`/admin/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: draft.title,
          category: draft.category,
          description: draft.description,
          linkUrl: draft.linkUrl,
          stage: draft.stage,
        }),
      });
      setDrafts((previous) => {
        const next = { ...previous };
        delete next[project.id];
        return next;
      });
      setEditing(null);
      await load();
      toast.success('Project updated.');
    } catch (error) {
      toast.error('Update failed', error.message);
    } finally {
      setBusy('');
    }
  };

  const uploadImage = async (project, file) => {
    if (!file) return;
    setBusy(project.id);
    try {
      const uploaded = await startUpload([file]);
      const result = uploaded?.[0];
      if (!result) throw new Error('Upload failed. Please try again.');

      await adminFetch(`/admin/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          imageKey: result.key,
          imageUrl: result.ufsUrl || result.url || '',
        }),
      });
      await load();
      toast.success('Image uploaded.');
    } catch (error) {
      toast.error('Upload failed', error.message);
    } finally {
      setBusy('');
    }
  };

  const removeProject = async (project) => {
    const confirmed = await toast.confirm(
      'Delete project?',
      `${project.title} will be removed from the portfolio.`,
      { confirmText: 'Yes, delete', cancelText: 'Cancel' },
    );
    if (!confirmed) return;

    setBusy(project.id);
    try {
      await adminFetch(`/admin/projects/${project.id}`, { method: 'DELETE' });
      await load();
      toast.success('Project deleted.');
    } catch (error) {
      toast.error('Delete failed', error.message);
    } finally {
      setBusy('');
    }
  };

  const addProject = async () => {
    setBusy('new');
    try {
      await adminFetch('/admin/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
      });
      setNewProject(emptyProject);
      await load();
      toast.success('Project added.');
    } catch (error) {
      toast.error('Add failed', error.message);
    } finally {
      setBusy('');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Work</p>
          <h1 className="mt-2 font-serif text-3xl">Projects</h1>
          <p className="mt-2 text-[13px] text-muted">
            Shown on the public site in this order. Images are hosted on UploadThing.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {projects.map((project) => {
          const draft = draftFor(project);
          const isEditing = editing === project.id;

          return (
            <div key={project.id} className="border border-line bg-paper">
              <div className="flex flex-wrap items-center gap-4 p-4">
                <div className="h-14 w-20 shrink-0 overflow-hidden border border-line bg-paper-2">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] text-muted">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                    {project.category} · {project.stage === 'launched' ? 'Live' : 'In development'}
                  </p>
                  <p className="truncate text-[14px] font-semibold">{project.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-1.5 border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink">
                    <ImagePlus className="h-3.5 w-3.5" />
                    Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => uploadImage(project, event.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditing(isEditing ? null : project.id)}
                    className="border border-line px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    {isEditing ? 'Close' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(project)}
                    disabled={busy === project.id}
                    aria-label={`Delete ${project.title}`}
                    className="text-muted transition-colors hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="space-y-3 border-t border-line bg-paper-2/40 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Title
                      </span>
                      <input
                        value={draft.title}
                        onChange={(event) => updateDraft(project.id, { title: event.target.value })}
                        className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Category
                      </span>
                      <input
                        value={draft.category}
                        onChange={(event) => updateDraft(project.id, { category: event.target.value })}
                        className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Description
                    </span>
                    <textarea
                      rows={2}
                      value={draft.description}
                      onChange={(event) => updateDraft(project.id, { description: event.target.value })}
                      className="resize-y border border-line bg-paper px-3 py-2 text-[13px] leading-relaxed focus:border-ink focus:outline-none"
                    />
                  </label>

                  <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Live URL
                      </span>
                      <input
                        value={draft.linkUrl || ''}
                        onChange={(event) => updateDraft(project.id, { linkUrl: event.target.value })}
                        className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Stage
                      </span>
                      <select
                        value={draft.stage}
                        onChange={(event) => updateDraft(project.id, { stage: event.target.value })}
                        className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
                      >
                        <option value="launched">Live</option>
                        <option value="in-progress">In development</option>
                      </select>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => saveProject(project)}
                    disabled={busy === project.id}
                    className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:opacity-60"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save project
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section className="mt-8 border border-line bg-paper">
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-serif text-xl">Add a project</h2>
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Title
              </span>
              <input
                value={newProject.title}
                onChange={(event) => setNewProject({ ...newProject, title: event.target.value })}
                className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Category
              </span>
              <input
                value={newProject.category}
                onChange={(event) => setNewProject({ ...newProject, category: event.target.value })}
                className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Description
            </span>
            <textarea
              rows={2}
              value={newProject.description}
              onChange={(event) => setNewProject({ ...newProject, description: event.target.value })}
              className="resize-y border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Live URL
              </span>
              <input
                value={newProject.linkUrl}
                onChange={(event) => setNewProject({ ...newProject, linkUrl: event.target.value })}
                className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Stage
              </span>
              <select
                value={newProject.stage}
                onChange={(event) => setNewProject({ ...newProject, stage: event.target.value })}
                className="border border-line bg-paper px-3 py-2 text-[13px] focus:border-ink focus:outline-none"
              >
                <option value="in-progress">In development</option>
                <option value="launched">Live</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={addProject}
            disabled={busy === 'new' || !newProject.title}
            className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-accent hover:text-ink disabled:opacity-60"
          >
            <Plus className="h-3.5 w-3.5" />
            Add project
          </button>
          <p className="text-[11px] text-muted">
            Upload its image from the project row after adding it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProjectsAdmin;
