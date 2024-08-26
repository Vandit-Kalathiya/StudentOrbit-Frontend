import ProjectProgress from './ProjectProgress';

const weeks = [
  { progress: 30, details: 'Initial setup and research.' },
  { progress: 50, details: 'Development of core features.' },
  { progress: 70, details: 'Testing and bug fixes.' },
  { progress: 90, details: 'Final review and adjustments.' },
  { progress: 100, details: 'Project completed and delivered.' }
];

const Project = () => {
  return (
    <div className="container mx-auto p-4">
      <ProjectProgress weeks={weeks} />
    </div>
  );
};

export default Project;