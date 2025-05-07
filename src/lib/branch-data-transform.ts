export function transformBranchData(data: any, lang: string) {
    const branchInfo = {
      title: lang === "ar" ? data.branch_name_ar : data.branch_name,
      description: "", // Optional: customize if needed
      logo: data.logo || data.logo_ar,
      country: data.country,
    };
  
    const branchScheduleInfo = {
      workingHours: data.working_hours || [],
      location: data.location || null,
    };
  
    const technicalInfo = {
      rest_id: data.rest_id,
      vat: data.vat,
      tip_list: data.tip_list,
      tips_accept: data.tips_accept,
      currency: data.currency,
      colors: data.colors_branch,
    };
  
    return {
      branchInfo,
      branchScheduleInfo,
      technicalInfo,
    };
  }
  