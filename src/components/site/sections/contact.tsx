"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload, FiMail } from "react-icons/fi";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { Frame } from "@/components/site/frame";
import { person } from "@/content/resume";

export function Contact() {
  return (
    <Frame id="contact" label="Contact" title="Let's build something.">
      <Block id="contact" owner="hero" className="card">
        <Typable
          as="p"
          className="muted m-0 max-w-[60ch] text-base leading-relaxed"
          text="Hiring, collaborating, or just want to talk shop about React, Node, Spring Boot or AI agents? My inbox is open."
        />
        <div data-part="cascade" className="mt-6 flex flex-wrap gap-3">
          <a className="btn primary" href={`mailto:${person.links.email}`}>
            <FiMail aria-hidden="true" /> {person.links.email}
          </a>
          <a className="btn" href={person.links.linkedin} target="_blank" rel="noreferrer">
            <FaLinkedinIn aria-hidden="true" /> LinkedIn
          </a>
          <a className="btn" href={person.links.github} target="_blank" rel="noreferrer">
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <a className="btn" href={person.links.resume} download>
            <FiDownload aria-hidden="true" /> Resume
          </a>
        </div>
      </Block>
    </Frame>
  );
}
