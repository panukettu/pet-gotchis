// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const OWNER_ADDRESS = "0x";
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signers = await ethers.getSigners();
  const AavegotchiDiamond = await ethers.getContractAt(
    "AavegotchiDiamond",
    "0x86935F11C86623deC8a25696E1C19a8659CbF95d"
  );

  let operator;

  if (signers.length === 2) {
    let owner = signers[0];
    operator = signers[1];

    const isOperator = AavegotchiDiamond.isPetOperatorForAll(
      owner.address,
      operator.address
    );

    if (!isOperator) {
      if (!process.env.PRIVATE_KEY_OWNER || !process.env.PRIVATE_KEY_OPERATOR) {
        console.log("Plz setup owner & operator key to approve pettings");
        return;
      }
      const tx = await AavegotchiDiamond.setPetOperatorForAll(
        operator.address,
        true
      );
      await tx.wait();
      console.log("Succesfully set", operator.address, "as pet operator");
    }
  } else {
    operator = signers[0];
  }

  if (!!process.env.PRIVATE_KEY_OWNER) {
    console.log("Remove your owner key from the env now for SaFu plz");
    return;
  }

  if (OWNER_ADDRESS.length === 2) {
    console.error("Set your OWNER_ADDRESS");
    return;
  }

  while (true) {
    const gotchiInfo = await AavegotchiDiamond.tokenIdsWithKinship(
      OWNER_ADDRESS,
      1,
      0,
      true
    );

    const lastInteracted = Number(gotchiInfo[0][2]);
    const nextInteract = lastInteracted + 43200;
    const currentTime = Date.now() / 1000;

    const canInteract = nextInteract - currentTime < 0;

    if (canInteract) {
      const tx = await AavegotchiDiamond.interact(gotchiInfo.map((i) => i[0]));
      await tx.wait();
      console.log("Succesfully petted", gotchiInfo.length, "gotchis");
    } else {
      console.log("Next interact in", (nextInteract - currentTime) / 3600);
    }

    await delay(30000);
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
