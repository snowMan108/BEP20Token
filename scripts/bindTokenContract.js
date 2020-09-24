const Token = artifacts.require("Token");
const tokenManager = artifacts.require("ITokenManager");
// The Address of token manager 
const tokenManagerConctractAddr = "0x0000000000000000000000000000000000001008"

module.exports = async function () {
   try {
      const token = await Token.deployed()
      const tm = await tokenManager.at(tokenManagerConctractAddr)
      await tm.approveBind(token.address, "SWINGBY-888")
   } catch (err) {
      console.log(err)
   }
}
