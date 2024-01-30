import React, { useState, useEffect } from "react";
import { fetchMemberData, fetchCarePartnerData } from "../utils/api";
import { jsPDF } from "jspdf";

function MembersandPartners() {
  const [members, setMembers] = useState(null);
  const [carePartners, setCarePartners] = useState(null);
  const [matches, setMatches] = useState(null);
  const [jsonRendered, setJsonRendered] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const memberData = await fetchMemberData();
        const carePartnerData = await fetchCarePartnerData();
        setMembers(memberData);
        setCarePartners(carePartnerData);
      } catch (error) {
        console.error("Unable to fetch", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function formMatches(membersData, carePartnersData) {
      const matches = [];

      membersData.forEach((member) => {
        const matchedCarePartner = findBestCarePartner(
          member,
          carePartnersData
        );

        if (matchedCarePartner) {
          matches.push({
            member_id: member.id,
            care_partner_id: matchedCarePartner.id,
          });
        }
      });

      return matches;
    }

    if (members && carePartners && !jsonRendered) {
      const matchedPairs = formMatches(members, carePartners);
      setMatches(matchedPairs);
      setJsonRendered(true);
    }
  }, [members, carePartners, jsonRendered]);

  function findBestCarePartner(member, carePartnersData) {
    const matchingCarePartners = carePartnersData?.filter(
      (carePartner) =>
        carePartner.specialties.includes(member.use_case) &&
        carePartner.timezone === member.caregiver_location.timezone
    );

    if (matchingCarePartners.length > 0) {
      return matchingCarePartners[0];
    } else {
      return null;
    }
  }

  const JSONMatches = JSON.stringify(matches, null, 2);

  function downloadPdf(matches, filename) {
    const jsonStr = JSON.stringify(matches, null, 2);
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(jsonStr, 10, 10);
    doc.save(filename);
  }
  const downloadMatchesPdf = () => {
    downloadPdf(matches, "matches.pdf");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Members and Care Partners Matches</h2>
        <button
          style={{
            borderRadius: "50px",
            border: "2px purple solid",
            backgroundColor: "white",
          }}
          onClick={downloadMatchesPdf}
        >
          PDF Prettier Version
        </button>
      </div>

      <pre>{JSONMatches}</pre>
    </div>
  );
}

export default MembersandPartners;
