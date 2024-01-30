import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import MembersandPartners from "./MembersandPartners";

describe("MembersandPartners component", () => {
  it("renders component with member and care partner matches", async () => {
    jest.spyOn(global, "fetchMemberData").mockResolvedValue([
      {
        id: 1,
        first_name: "Tom",
        last_name: "Brady",
        use_case: "example",
        caregiver_location: { timezone: "America/New_York" },
      },
    ]);

    jest.spyOn(global, "fetchCarePartnerData").mockResolvedValue([
      {
        id: 1,
        first_name: "Jerry",
        last_name: "Rice",
        specialties: ["example"],
        timezone: "America/New_York",
      },
    ]);

    render(<MembersandPartners />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Member Name: Tom Brady ID: 1 , Care Partner: Jerry Rice Care Partner ID: 1"
        )
      ).toBeInTheDocument();
    });
  });
});
