import { useState } from "react";
export const Section = ({ title, desc, isVisible, setIsvisible }) => {
  return (
    <div className="border border-black p-4">
      <h3 className="3xl font-bold">{title}</h3>
      {console.log(setIsvisible)}
      {isVisible ? (
        <>
          <button className=" underline text-blue-600" onClick={()=>setIsvisible()}>hide</button>
          <p>{desc}</p>
        </>
      ) : (
        <button onClick={()=>setIsvisible()}>show</button>
      )}
    </div>
  );
};
const Accordion = () => {
  const [visibleSection, setVisibleSection] = useState("about");
  return (
    <div>
      <Section
        title={"About Section"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, qui! Neque molestias officia autem saepe eos perspiciatis deleniti sunt obcaecati iure, incidunt doloribus beatae aperiam nisi blanditiis, perferendis quasi amet."
        }
        isVisible={visibleSection === "about"}
        setIsvisible={()=>setVisibleSection("about")}
      />

      <Section
        title={"Team Section"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, qui! Neque molestias officia autem saepe eos perspiciatis deleniti sunt obcaecati iure, incidunt doloribus beatae aperiam nisi blanditiis, perferendis quasi amet."
        }
        isVisible={visibleSection === "team"}
        setIsvisible={()=>setVisibleSection("team")}
      />

      <Section
        title={"Carrers"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, qui! Neque molestias officia autem saepe eos perspiciatis deleniti sunt obcaecati iure, incidunt doloribus beatae aperiam nisi blanditiis, perferendis quasi amet."
        }
        isVisible={visibleSection === "career"}
        setIsvisible={()=>setVisibleSection("career")}
      />
    </div>
  );
};

export default Accordion;
