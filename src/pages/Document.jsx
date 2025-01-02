import React, { useState, useEffect } from "react";
import { FaFolderOpen, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import FormReqLetter from "../components/form/formApplicantLetter";
import { Label, TextInput } from "flowbite-react";

const Document = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

      <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" variant="fullWidth">
          <Tabs.Item active title="Profile surat" icon={HiUserCircle}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </span>
            . Panduan Pendaftaran Sidang Komisi
            <FormReqLetter FormName={"Form Blanko Kolokium"} />
          </Tabs.Item>

          <Tabs.Item title="Kolokium" icon={MdDashboard}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </span>
            . Panduan Pendaftaran Kolokium
            <FormReqLetter FormName={"Form Blanko Kolokium"} />
          </Tabs.Item>

          <Tabs.Item title="Settings" icon={HiAdjustments}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </span>
            . Panduan Pendaftaran
            <FormReqLetter FormName={"Form Blanko Kolokium"} />
          </Tabs.Item>

          <Tabs.Item title="Contacts" icon={HiClipboardList}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            . Panduan Pendaftaran Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam ipsum praesentium in rerum maiores
            placeat atque delectus ea hic nulla perferendis nemo omnis aliquam
            voluptatum, ipsa reiciendis quod debitis pariatur!
            <FormReqLetter FormName={"Form Blanko Kolokium"} />
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
};

export default Document;
