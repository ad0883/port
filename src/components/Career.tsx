import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>S.R.M INSTITUTE OF SCIENCE AND TECHNOLOGY</h4>
                <h5>B.TECH CSE STUDENT</h5>
              </div>
              <h3>2023-27</h3>
            </div>
            <p>
            B.Tech CSE student at SRMIST Delhi-NCR, passionate about AI/ML,full-stack development,and emerging technologies.
            Actively contributing to HackHound,the official tech club,through hackathons,workshops and projects.
            Constantly learning, innovating, and building impactful tech solutions!
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core team member</h4>
                <h5>HackHound</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
            I would play a crucial role in both the technical and creative aspects of the the only official independent technical club of SRMIST Delhi-NCR.
            On the AI/ML front,I assist participants working on machine learning projects by providing technical support, 
            suggesting relevant frameworks,and helping organize AI-related workshops and mentorship sessions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>FINLATICS</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
            Gaining hands-on experience in fintech,data analytics and financial innovation | Exploring the intersection of technology and finance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
