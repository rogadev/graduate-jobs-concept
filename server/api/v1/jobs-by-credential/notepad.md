## Raw Jobs Data Example

```json
[
  {
    "noc_number": "00012",
    "occupation": "Senior managers - financial, communications and other business services",
    "details": [
      {
        "section": "Illustrative example(s)",
        "details": [
          "advertising agency president",
          "bank president",
          "chief executive officer (CEO) - telephone company",
          "chief financial officer (CFO) - advertising agency",
          "chief operating officer - engineering firm",
          "computing services company president",
          "credit union executive director",
          "executive vice-president - real estate agency",
          "general manager - real estate management company",
          "human resources vice-president - bank",
          "marketing vice-president - clerical staff services",
          "operations vice-president - satellite communication services",
          "president and chief executive officer - financial, communications and other business services",
          "trust company regional vice-president"
        ]
      },
      {
        "section": "Exclusion(s)",
        "details": [
          "Managers in communication (except broadcasting) (See 1003 Managers in communication (except broadcasting))",
          "Managers in engineering, architecture, science and information systems (See 2001 Managers in engineering, architecture, science and information systems)",
          "Managers in financial and business services (See 1002 Managers in financial and business services)"
        ]
      },
      {
        "section": "Main duties",
        "details": [
          "Determine the company's mission and strategic direction as conveyed through policies and concrete objectives which are met through the effective management of human, financial and material resources",
          "Authorize and organize the establishment of major departments and associated senior staff positions",
          "Allocate material, human and financial resources to implement organizational policies and programs; establish financial and administrative controls; formulate and approve promotional campaigns; and approve overall human resources planning",
          "Select middle managers, directors or other executive staff; delegate the necessary authority to them and create optimum working conditions",
          "Represent the organization, or delegate representatives to act on behalf of the organization, in negotiations or other official functions."
        ]
      },
      {
        "section": "Employment requirements",
        "details": [
          "A university degree in business administration, commerce, computer science or other discipline related to the service provided is usually required.",
          "Several years of experience as a middle manager in financial, communications or other business services are usually required.",
          "Specialization in a particular functional area or service is possible through specific university training in that area or through previous experience.",
          "Senior managers in finance usually require a professional accounting or financial designation."
        ]
      },
      {
        "section": "Additional information",
        "details": ["There is mobility among senior management occupations."]
      }
    ]
  },
  {
    // ... 316 more unit groups
  }
]
```

## Search Request Body

```json
{
  "credential": "degree", // degree, certificate, or diploma
  "keywords": ["computer science", "computer engineering"],
  "duration": null // null, bachelor, master, or phd
}
```

## Expected Result

```json
[
  {
    "unit_groups": [
      {
        "noc_number": "00012",
        "group_title": "Senior managers - financial, communications and other business services",
        "requirements": [
          "A university degree in business administration, commerce, computer science or other discipline related to the service provided is usually required.",
          "Several years of experience as a middle manager in financial, communications or other business services are usually required.",
          "Specialization in a particular functional area or service is possible through specific university training in that area or through previous experience.",
          "Senior managers in finance usually require a professional accounting or financial designation."
        ],
        "description": [
          "Determine the company's mission and strategic direction as conveyed through policies and concrete objectives which are met through the effective management of human, financial and material resources",
          "Authorize and organize the establishment of major departments and associated senior staff positions",
          "Allocate material, human and financial resources to implement organizational policies and programs; establish financial and administrative controls; formulate and approve promotional campaigns; and approve overall human resources planning",
          "Select middle managers, directors or other executive staff; delegate the necessary authority to them and create optimum working conditions",
          "Represent the organization, or delegate representatives to act on behalf of the organization, in negotiations or other official functions."
        ]
      },
      {
        // and more...
      }
    ],
    "jobs": [
      {
        "noc_number": "00012",
        "title": "advertising agency president"
      },
      {
        "noc_number": "00012",
        "title": "bank president"
      },
      {
        "noc_number": "00012",
        "title": "advertising agency president"
      },
      {}
    ]
  }
]
```

## Plan

1. Find unit groups that match our search parameters.

2. Once we've formed that object, run through our found unit groups and extract jobs and their NOC number.

3. Don't forget to title case titles.
