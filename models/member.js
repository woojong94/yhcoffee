const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');



const member = {
  async join(data){
    try{
    data.memPw = await bcrypt.hash(data.memPw, 10);
    delete data.memPwRe;

    const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
    await fs.writeFile(filePath, JSON.stringify(data));

    return true;
    }catch(err){
      return false;
    }
  },
  async login(memId, memPw, req){
    try{
      const info = await this.get(memId);
      if (!info){
        throw new Error("회원정보 없음.");
      }

      const match = await bcrypt.compare(memPw, info.memPw);
      if(!match){
        throw new Error("비밀번호 불일치");
      }
      if(match){

        req.session.memId = memId;

        return true;
      }

    }catch(err){
      return false;
    }
  },
  async get(memId){
    try{
      const filePath = path.join(__dirname, "../data/member", memId + ".json");

      let data = await fs.readFile(filePath);
      data = JSON.parse(data.toString());
      console.log(filePath);
      console.log(data);
      return data;
    }catch(err){
      return false;
    }
  }
}

module.exports = member;
