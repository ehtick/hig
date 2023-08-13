import { takeSnapshotsOf } from "@weave-design/jest-preset/helpers";

import ProfileActionPresenter from "./ProfileActionPresenter";

describe("top-nav/presenters/ProfileActionPresenter", () => {
  takeSnapshotsOf(ProfileActionPresenter, [
    {
      desc: "renders with children",
      props: {
        children: "Peter Parker",
      },
    },
  ]);
});
