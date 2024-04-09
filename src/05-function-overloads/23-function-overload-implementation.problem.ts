import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}

// 下面3个是类型定义，当role是admin或user时会被前2个捕获，当role是其他时会被第3个捕获
function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: unknown): AnonymousPrivileges;
// 这个是函数实现
function getRolePrivileges(
  role: unknown
): AdminPrivileges | UserPrivileges | AnonymousPrivileges {
  switch (role) {
    case "admin":
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case "user":
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return {
        sitesCanVisit: [],
      };
  }
}

it("Should return the correct privileges", () => {
  const adminPrivileges = getRolePrivileges("admin");

  const userPrivileges = getRolePrivileges("user");
  const anonymousPrivileges = getRolePrivileges("anonymous");

  type tests = [
    Expect<Equal<typeof adminPrivileges, AdminPrivileges>>,
    Expect<Equal<typeof userPrivileges, UserPrivileges>>,
    Expect<Equal<typeof anonymousPrivileges, AnonymousPrivileges>>
  ];
});
