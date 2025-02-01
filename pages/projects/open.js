import React, { useState, useEffect } from 'react';
import factory from '../../contracts/factory';
import { Link } from '../../scripts/route';
import Project from '../../contracts/project';
import Layout from '@/components/Layout';
import CryptoJS from 'crypto-js';

const OpenProject = ({ projects }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectSummaries = await Promise.all(
          projects.map((projectAddress) =>
            Project(projectAddress).methods.getDetails().call()
          )
        );
        setSummary(projectSummaries);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projects.length > 0) {
      fetchProjectDetails();
    }
  }, [projects]);

  const decryptData = (encryptedData, key = 'my-secret-key@123') => {
    try {
      return CryptoJS.AES.decrypt(encryptedData, key)
        .toString(CryptoJS.enc.Utf8)
        .replace(/['"]+/g, '');
    } catch (error) {
      console.error('Decryption error:', error);
      return 'N/A';
    }
  };

  const renderProjects = () => {
    return projects.map((address, index) => {
      if (!summary || !summary[index]) return null;

      const projectSummary = summary[index];
      const img = decryptData(projectSummary[7]);
      const header = decryptData(projectSummary[5]);
      const target = parseFloat(projectSummary[8]);
      const fundsAvailable = projectSummary[1] / 1000000000000000000;
      const isProjectComplete = fundsAvailable >= target;

      return (
        <div key={index} className="project-card">
          <div className="project-image">
            <img src={img} alt={header} />
          </div>

          <div className="project-content">
            <h3 className="project-title">
              {header}
              <hr />
            </h3>
            <div className="project-details">
              <button
                className="btn-target"
                style={{ borderColor: 'green', color: 'green' }}
              >
                Target: {target} Ether
              </button>
              <button
                className="btn-minimum"
                style={{ borderColor: 'red', color: 'red' }}
              >
                Minimum: {projectSummary[0]} Wei
              </button>
            </div>

            <button
              className={`btn-funds ${isProjectComplete ? 'btn-funds-complete' : 'btn-funds-pending'}`}
            >
              Funds Available: {fundsAvailable.toFixed(2)} ether
            </button>

            <button
              className={`btn-status ${isProjectComplete ? 'btn-status-complete' : 'btn-status-pending'}`}
            >
              Project Status: {isProjectComplete ? 'Completed' : 'Pending'}
            </button>

            <Link route={`/projects/${address}`}>
              <button className="btn-view-project">View Project</button>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <Layout>
      <div className="project-container">
        <h2 className="projects-title">Open Projects</h2>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          <div className="projects-grid">{renderProjects()}</div>
        )}
      </div>
    </Layout>
  );
};

OpenProject.getInitialProps = async () => {
  const projects = await factory.methods.getDeployedProjects().call();
  return { projects };
};

export default OpenProject;
