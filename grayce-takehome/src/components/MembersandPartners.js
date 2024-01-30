import React, { useState, useEffect } from "react";
import { fetchMemberData, fetchCarePartnerData } from "../utils/api";
import { jsPDF } from "jspdf";

function MembersandPartners() {
  const [members, setMembers] = useState(null);
  const [carePartners, setCarePartners] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const memberData = await fetchMemberData();
      const carePartnerData = await fetchCarePartnerData();

      if (memberData && carePartnerData) {
        setMembers(memberData);
        setCarePartners(carePartnerData);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (members && carePartners) {
      const matchedPairs = formMatches(members, carePartners);
      setMatches(matchedPairs);
    }
  });

  function formMatches(membersData, carePartnersData) {
    const matches = [];

    membersData.forEach((member) => {
      const matchedCarePartner = findBestCarePartner(member, carePartnersData);

      if (matchedCarePartner) {
        matches.push({
          member_id: member.id,
          care_partner_id: matchedCarePartner.id,
        });
      }
    });

    return matches;
  }

  function findBestCarePartner(member, carePartnersData) {
    const matchingCarePartners = carePartnersData.filter(
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

  function downloadPdf(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);

    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(jsonStr, 10, 10);
    doc.save(filename);
  }
  const downloadMatchesPdf = () => {
    downloadPdf(matches, "matches.pdf");
  };

  return (
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
        Download JSON matches
      </button>
      {/* If information is displayed */}
      {/* {matches &&
        matches.map((match) => (
          <div key={`${match.member_id}-${match.care_partner_id}`}>
            ID: {match.member_id} , Care Partner ID: {match.care_partner_id}
          </div>
        ))} */}
    </div>
  );
}

export default MembersandPartners;
