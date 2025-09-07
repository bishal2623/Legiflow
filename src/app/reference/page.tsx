
'use client';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dummy Data
const legalData = {
  constitution: {
    articles: {
      "Article 1": "Name and territory of the Union.",
      "Article 2": "Admission or establishment of new States.",
      "Article 3": "Formation of new States and alteration of areas, boundaries or names of existing States.",
      "Article 14": "Equality before law. The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
      "Article 15": "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth.",
      "Article 16": "Equality of opportunity in matters of public employment.",
      "Article 17": "Abolition of Untouchability.",
      "Article 18": "Abolition of titles.",
      "Article 19": "Protection of certain rights regarding freedom of speech, etc.",
      "Article 20": "Protection in respect of conviction for offences.",
      "Article 21": "Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law.",
      "Article 21A": "Right to education.",
      "Article 22": "Protection against arrest and detention in certain cases.",
      "Article 23": "Prohibition of traffic in human beings and forced labour.",
      "Article 24": "Prohibition of employment of children in factories, etc.",
      "Article 25": "Freedom of conscience and free profession, practice and propagation of religion.",
      "Article 32": "Right to Constitutional Remedies. The right to move the Supreme Court for the enforcement of the rights conferred by this Part is guaranteed.",
      "Article 51A": "Fundamental Duties. It shall be the duty of every citizen of India...",
      "Article 72": "Power of President to grant pardons, etc., and to suspend, remit or commute sentences in certain cases.",
      "Article 76": "Attorney-General for India.",
      "Article 123": "Power of President to promulgate Ordinances during recess of Parliament.",
      "Article 143": "Power of President to consult Supreme Court.",
      "Article 148": "Comptroller and Auditor-General of India.",
      "Article 155": "Appointment of Governor.",
      "Article 161": "Power of Governor to grant pardons, etc.",
      "Article 280": "Finance Commission.",
      "Article 324": "Election Commission.",
      "Article 352": "Proclamation of Emergency (National Emergency).",
      "Article 356": "Provisions in case of failure of constitutional machinery in States (President's Rule).",
      "Article 360": "Provisions as to financial emergency.",
      "Article 368": "Power of Parliament to amend the Constitution.",
      "Article 370": "Temporary provisions with respect to the State of Jammu and Kashmir (repealed).",
    },
     parts: {
      "Part I": "The Union and its Territory (Articles 1-4)",
      "Part II": "Citizenship (Articles 5-11)",
      "Part III": "Fundamental Rights (Articles 12-35)",
      "Part IV": "Directive Principles of State Policy (Articles 36-51)",
      "Part IVA": "Fundamental Duties (Article 51A)",
      "Part V": "The Union (Articles 52-151)",
      "Part VI": "The States (Articles 152-237)",
      "Part VIII": "The Union Territories (Articles 239-242)",
      "Part IX": "The Panchayats (Articles 243-243O)",
      "Part IXA": "The Municipalities (Articles 243P-243ZG)",
      "Part X": "The Scheduled and Tribal Areas (Articles 244-244A)",
      "Part XI": "Relations between the Union and the States (Articles 245-263)",
      "Part XII": "Finance, Property, Contracts and Suits (Articles 264-300A)",
      "Part XIII": "Trade, Commerce and Intercourse within the Territory of India (Articles 301-307)",
      "Part XIV": "Services under the Union and the States (Articles 308-323)",
      "Part XIVA": "Tribunals (Articles 323A-323B)",
      "Part XV": "Elections (Articles 324-329A)",
      "Part XVI": "Special Provisions relating to Certain Classes (Articles 330-342)",
      "Part XVII": "Official Language (Articles 343-351)",
      "Part XVIII": "Emergency Provisions (Articles 352-360)",
      "Part XX": "Amendment of the Constitution (Article 368)",
    },
    schedules: {
      "First Schedule": "Lists the states and territories of India.",
      "Second Schedule": "Lists the salaries of public officials, judges, and the President.",
      "Third Schedule": "Forms of Oaths and Affirmations.",
      "Fourth Schedule": "Allocation of seats in the Rajya Sabha.",
      "Fifth Schedule": "Provisions as to the Administration and Control of Scheduled Areas and Scheduled Tribes.",
      "Sixth Schedule": "Provisions as to the Administration of Tribal Areas in the States of Assam, Meghalaya, Tripura and Mizoram.",
      "Seventh Schedule": "Union List, State List, and Concurrent List.",
      "Eighth Schedule": "List of recognized languages.",
      "Ninth Schedule": "Validation of certain Acts and Regulations.",
      "Tenth Schedule": "Provisions as to disqualification on ground of defection (Anti-Defection Law).",
      "Eleventh Schedule": "Powers, authority and responsibilities of Panchayats.",
      "Twelfth Schedule": "Powers, authority and responsibilities of Municipalities.",
    },
    amendments: {
      "1st Amendment (1951)": "Added Ninth Schedule to protect land reform laws.",
      "7th Amendment (1956)": "Reorganisation of states on linguistic lines.",
      "24th Amendment (1971)": "Affirmed the power of Parliament to amend any part of the Constitution, including fundamental rights.",
      "42nd Amendment (1976)": "The 'Mini-Constitution', added 'socialist' and 'secular' to the preamble, and laid down Fundamental Duties.",
      "44th Amendment (1978)": "Removed the Right to Property from the list of Fundamental Rights.",
      "52nd Amendment (1985)": "Added the Tenth Schedule (Anti-Defection Law).",
      "61st Amendment (1989)": "Lowered the voting age from 21 to 18.",
      "73rd Amendment (1992)": "Granted constitutional status to Panchayati Raj institutions.",
      "74th Amendment (1992)": "Granted constitutional status to Urban Local Bodies.",
      "86th Amendment (2002)": "Made elementary education a fundamental right (Article 21A).",
      "97th Amendment (2011)": "Gave constitutional status and protection to co-operative societies.",
      "101st Amendment (2016)": "Introduced the Goods and Services Tax (GST).",
      "102nd Amendment (2018)": "Gave constitutional status to the National Commission for Backward Classes.",
      "103rd Amendment (2019)": "Provided 10% reservation for Economically Weaker Sections (EWS).",
      "104th Amendment (2020)": "Extended the reservation of seats for SCs and STs in the Lok Sabha and state assemblies.",
      "105th Amendment (2021)": "Restored the power of state governments to identify and specify Socially and Educationally Backward Classes (SEBCs).",
    },
  },
  ipc: {
    "Section 120B": "Punishment of criminal conspiracy.",
    "Section 121": "Waging, or attempting to wage war, or abetting waging of war, against the Government of India.",
    "Section 124A": "Sedition.",
    "Section 141": "Unlawful assembly.",
    "Section 146": "Rioting.",
    "Section 153A": "Promoting enmity between different groups on grounds of religion, race, place of birth, residence, language, etc., and doing acts prejudicial to maintenance of harmony.",
    "Section 295A": "Deliberate and malicious acts, intended to outrage religious feelings of any class by insulting its religion or religious beliefs.",
    "Section 299": "Culpable homicide.",
    "Section 300": "Murder. Culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death...",
    "Section 302": "Punishment for murder. Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
    "Section 304": "Punishment for culpable homicide not amounting to murder.",
    "Section 304A": "Causing death by negligence.",
    "Section 304B": "Dowry death.",
    "Section 307": "Attempt to murder. Whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder, shall be punished...",
    "Section 308": "Attempt to commit culpable homicide.",
    "Section 354": "Assault or criminal force to woman with intent to outrage her modesty.",
    "Section 354D": "Stalking.",
    "Section 375": "Rape. A man is said to commit rape who penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person...",
    "Section 376": "Punishment for rape.",
    "Section 377": "Unnatural offences.",
    "Section 378": "Theft. Whoever, intending to take dishonestly any moveable property out of the possession of any person without that person’s consent, moves that property in order to such taking, is said to commit theft.",
    "Section 379": "Punishment for theft.",
    "Section 383": "Extortion.",
    "Section 390": "Robbery.",
    "Section 391": "Dacoity.",
    "Section 395": "Punishment for dacoity.",
    "Section 405": "Criminal breach of trust.",
    "Section 415": "Cheating.",
    "Section 420": "Cheating and dishonestly inducing delivery of property. Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person...",
    "Section 441": "Criminal trespass.",
    "Section 463": "Forgery.",
    "Section 498A": "Husband or relative of husband of a woman subjecting her to cruelty.",
    "Section 499": "Defamation. Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm...",
    "Section 503": "Criminal intimidation. Whoever threatens another with any injury to his person, reputation or property...",
    "Section 506": "Punishment for criminal intimidation.",
    "Section 509": "Word, gesture or act intended to insult the modesty of a woman.",
  }
};

export default function LegalReferencePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
        setResult("");
        return;
    }
    let found = null;

    const searchCategory = (category: Record<string, string>, prefix = '') => {
        for (const [key, value] of Object.entries(category)) {
            const fullKey = `${prefix}${key}`;
            if (fullKey.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
                found = `${fullKey}: ${value}`;
                return;
            }
        }
    };
    
    searchCategory(legalData.constitution.articles);
    if (found) { setResult(found); return; }

    searchCategory(legalData.constitution.parts);
    if (found) { setResult(found); return; }

    searchCategory(legalData.constitution.schedules);
    if (found) { setResult(found); return; }

    searchCategory(legalData.constitution.amendments);
    if (found) { setResult(found); return; }

    searchCategory(legalData.ipc, 'IPC ');
    if (found) { setResult(found); return; }
    
    setResult("❌ No match found!");
  };

  const renderList = (data: Record<string, string>, prefix = '') => (
    <ul className="list-disc ml-5 space-y-2">
        {Object.entries(data).map(([key, value]) => (
            <li key={key}>
            <strong>{prefix}{key}</strong>: {value}
            </li>
        ))}
    </ul>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-3">
            📖 Indian Constitution & ⚖ IPC Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="🔍 Search (e.g. Article 21, Part III, IPC 302)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {result && (
            <Card className="mt-4 p-4 bg-muted/50">
              <p>{result}</p>
            </Card>
          )}
          
           <div className="space-y-8 mt-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary/90">📜 Constitution Articles</h3>
                  {renderList(legalData.constitution.articles)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary/90">📚 Constitution Parts</h3>
                  {renderList(legalData.constitution.parts)}
                </div>
                 <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary/90">📖 Constitution Schedules</h3>
                  {renderList(legalData.constitution.schedules)}
                </div>
                 <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary/90">📅 Constitution Amendments</h3>
                  {renderList(legalData.constitution.amendments)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-destructive/90">⚖ IPC Sections</h3>
                  {renderList(legalData.ipc, 'IPC ')}
                </div>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}

