import { useProgressData } from "./hooks/useProgressData";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { AccordionGroup } from "./components/AccordionGroup/AccordionGroup";
import "./App.css";

const App = () => {
  const { groups, loading, error, progress, toggleTask } = useProgressData();

  return (
    <main className="app">
      <div className="widget">
        {loading && (
          <p className="widget__status" role="status">
            Loading…
          </p>
        )}

        {error && (
          <p className="widget__status widget__status--error" role="alert">
            Failed to load data: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="widget__header">
              <h1 className="widget__title">Lodgify Grouped Tasks</h1>
              <ProgressBar value={progress} />
            </div>
            <section className="content" aria-label="Completion groups">
              {groups.map((group, groupIndex) => (
                <AccordionGroup
                  key={groupIndex}
                  group={group}
                  groupIndex={groupIndex}
                  onToggleTask={toggleTask}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default App;
