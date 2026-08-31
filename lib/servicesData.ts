export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  category: "Face" | "Body" | "Breast" | "Intimate" | "Minor Surgical";
  featured: boolean;
  image: string;
  shortDescription: string;
  heroHeadline: string;
  introduction: string;
  whatIsIt: string;
  benefits: string[];
  candidateCriteria: string[];
  procedureOverview: string;
  recoveryInfo: string;
  faqs: { question: string; answer: string }[];
  relatedServiceSlugs: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "gynecomastia",
    slug: "gynecomastia",
    name: "Gynecomastia (Male Breast Reduction)",
    category: "Body",
    featured: true,
    image: "/assets/services/Gynecomastia.png",
    shortDescription: "Surgical reduction of enlarged male breast tissue to achieve a firm, flat, and masculine chest contour.",
    heroHeadline: "Restore Masculine Chest Contours with Precision Surgical Care",
    introduction: "Gynecomastia is a condition characterized by enlarged glandular tissue and localized fat deposition in the male chest area. Sculpt Aesthetics provides advanced micro-incision surgical techniques to restore a natural, firm, and masculine chest wall profile.",
    whatIsIt: "Male breast reduction surgery involves surgical excision of excess glandular tissue combined with liposuction to eliminate excess adipose tissue. This dual-approach treatment permanently removes glandular enlargement and restores aesthetic chest proportions.",
    benefits: [
      "Permanent removal of enlarged glandular breast tissue",
      "Sculpted, firm, and natural masculine chest wall",
      "Concealed micro-incisions hidden along the areolar border",
      "Minimal downtime with rapid return to daily routine",
      "Restored self-confidence in fitted clothing and outdoors"
    ],
    candidateCriteria: [
      "Men experiencing enlarged glandular or fatty tissue in the chest area",
      "Individuals whose condition has not resolved through diet and exercise",
      "Non-smokers in good general health with stable body weight",
      "Men seeking a permanent solution for male chest enlargement"
    ],
    procedureOverview: "Performed under general or twilight anesthesia, the surgeon combines high-definition VASER or traditional liposuction with a small infra-areolar incision to meticulously excise dense glandular tissue and contour the pectoral region.",
    recoveryInfo: "Patients typically wear a light compression garment for 2–4 weeks. Mild swelling and bruising subside within 10–14 days. Routine sedentary work can be resumed in 3–5 days, while heavy lifting or chest exercises can be resumed after 4 weeks.",
    faqs: [
      {
        question: "Is male breast reduction surgery permanent?",
        answer: "Yes. The excised glandular tissue cannot grow back. Maintaining a stable body weight and balanced lifestyle ensures permanent, long-lasting aesthetic chest contours."
      },
      {
        question: "Will there be visible scars after gynecomastia surgery?",
        answer: "Incisions are placed discreetly along the natural boundary of the dark areolar skin or within natural chest folds, making scars virtually imperceptible once fully healed."
      }
    ],
    relatedServiceSlugs: ["liposuction", "body-contouring", "tummy-tuck"]
  },
  {
    id: "liposuction",
    slug: "liposuction",
    name: "Liposuction & Fat Removal",
    category: "Body",
    featured: true,
    image: "/assets/services/Liposuction.png",
    shortDescription: "Targeted body sculpting and fat removal to refine stubborn localized deposits and enhance body proportions.",
    heroHeadline: "Sculpt Your Ideal Silhouette with Advanced Micro-Liposuction",
    introduction: "Liposuction is a gold-standard body contouring procedure designed to eliminate stubborn localized fat deposits resistant to diet and exercise. Our plastic surgeons combine artful technique with medical precision to sculpt harmonious bodily contours.",
    whatIsIt: "Liposuction uses thin hollow tubes (cannulas) connected to a gentle vacuum device to selectively remove stubborn subcutaneous fat deposits from areas such as the abdomen, flanks, thighs, arms, and neck.",
    benefits: [
      "Targeted elimination of diet-resistant fat pockets",
      "Enhanced body definition, waistline, and muscle visibility",
      "Minimally invasive incisions with concealed placement",
      "Permanent reduction in localized fat cells",
      "Tailored contouring designed around individual body geometry"
    ],
    candidateCriteria: [
      "Adults within 30% of their ideal body weight with firm, elastic skin",
      "Individuals troubled by stubborn localized fat deposits",
      "Healthy individuals without life-threatening illnesses or medical conditions",
      "Nonsmokers committed to a healthy lifestyle"
    ],
    procedureOverview: "Through 3–4mm micro-incisions, tumescent solution is infused to minimize bleeding and comfort. Power-assisted or ultrasound-assisted cannulas then gently break down and aspirate targeted fat deposits while preserving surrounding nerves and vascularity.",
    recoveryInfo: "Compression garments are worn for 3–6 weeks to support newly contoured tissue and reduce fluid retention. Light activities can be resumed in 3 days, with normal work routines within a week.",
    faqs: [
      {
        question: "Is liposuction a weight loss procedure?",
        answer: "No. Liposuction is a body contouring procedure aimed at refining body shape and proportions rather than overall weight reduction."
      },
      {
        question: "Do fat cells return after liposuction?",
        answer: "Removed fat cells do not regenerate. However, remaining fat cells can expand if significant weight gain occurs post-procedure."
      }
    ],
    relatedServiceSlugs: ["body-contouring", "tummy-tuck", "mommy-makeover"]
  },

  {
    id: "rhinoplasty",
    slug: "rhinoplasty",
    name: "Rhinoplasty (Nose Reshaping)",
    category: "Face",
    featured: true,
    image: "/assets/services/Nose surgery.png",
    shortDescription: "Structural nose reshaping surgery to enhance facial harmony, refine nasal tip and bridge, and improve airway flow.",
    heroHeadline: "Achieve Facial Symmetry with Masterful Nasal Reshaping",
    introduction: "As the central feature of the face, the nose plays a crucial role in overall facial harmony. Rhinoplasty at Sculpt Aesthetics balances aesthetic proportions while optimizing structural airway function.",
    whatIsIt: "Rhinoplasty is a delicate plastic surgery procedure that reshapes the nasal bone, cartilage, and soft tissue matrix to modify the nasal bridge width, profile bump, tip projection, or nostril width.",
    benefits: [
      "Enhanced facial balance and overall aesthetic proportion",
      "Correction of dorsal humps, wide bridges, or drooping tips",
      "Improved nasal airway flow and breathing quality",
      "Correction of congenital deformities or traumatic injuries",
      "Subtle, natural-looking refinement tailored to your ethnicity and features"
    ],
    candidateCriteria: [
      "Individuals with fully developed facial bone structures (typically age 16+)",
      "Patients seeking correction of nasal hump, tip asymmetry, or breathing obstruction",
      "Nonsmokers with realistic expectations for aesthetic improvement"
    ],
    procedureOverview: "Performed via open or closed technique depending on surgical requirements. The nasal cartilage and bones are reshaped with sub-millimeter precision, followed by delicate redraping of internal lining and external skin.",
    recoveryInfo: "A lightweight external nasal splint is worn for 7 days. Most social swelling dissipates in 10–14 days, with final refined contouring evolving over 6–12 months.",
    faqs: [
      {
        question: "Will rhinoplasty improve my breathing?",
        answer: "Yes. Functional septorhinoplasty corrects deviated septums and internal valve collapse alongside aesthetic refinement."
      },
      {
        question: "How long until I see final rhinoplasty results?",
        answer: "Initial shape is clear after splint removal at 1 week, but subtle nasal tip swelling resolves gradually over 9 to 12 months."
      }
    ],
    relatedServiceSlugs: ["buccal-fat-removal", "facelift", "blepharoplasty"]
  },
  {
    id: "mommy-makeover",
    slug: "mommy-makeover",
    name: "Mommy Makeover",
    category: "Body",
    featured: true,
    image: "/assets/services/Mummy Makeover.png",
    shortDescription: "Tailored combination procedure restoring pre-pregnancy body contours, abdominal firmness, and breast shape.",
    heroHeadline: "Reclaim Your Pre-Pregnancy Figure with Custom Combined Care",
    introduction: "Pregnancy, childbirth, and breastfeeding cause lasting changes to a woman's abdominal muscles, skin elasticity, and breast volume. A Mommy Makeover combines targeted procedures into a single surgical plan to restore pre-pregnancy contours.",
    whatIsIt: "A customized multi-procedure treatment that typically combines abdominoplasty (tummy tuck), breast enhancement (augmentation, lift, or reduction), and high-definition liposuction tailored to your goals.",
    benefits: [
      "Single surgery and recovery timeline for multiple structural improvements",
      "Repaired abdominal muscle separation (diastasis recti)",
      "Restored breast volume, lift, and aesthetic youthful contour",
      "Elimination of stretch-marked abdominal skin and localized fat",
      "Customized treatment plan based on individual post-maternity changes"
    ],
    candidateCriteria: [
      "Women who have completed childbearing and breastfeeding (at least 6 months post)",
      "Women seeking to address sagging abdominal skin, split muscles, and altered breast shape",
      "Nonsmokers at a stable target weight in good overall medical health"
    ],
    procedureOverview: "In a single anesthesia session, the surgeon performs abdominoplasty muscle repair and skin removal, targeted liposuction of waistline/hips, and breast lift or augmentation procedures.",
    recoveryInfo: "Full physical rest is required for 2 weeks with assistance at home. Light normal activities resume by week 3, while exercise can be resumed around 6 weeks post-surgery.",
    faqs: [
      {
        question: "Can I have more children after a Mommy Makeover?",
        answer: "While safe, future pregnancies can stretch repaired muscles and skin. It is recommended to undergo the procedure after childbearing is complete."
      },
      {
        question: "Is it safe to perform multiple procedures at once?",
        answer: "Yes, when performed by experienced board-certified plastic surgeons in accredited surgical suites with strict duration guidelines."
      }
    ],
    relatedServiceSlugs: ["tummy-tuck", "breast-procedures", "liposuction"]
  },
  {
    id: "body-contouring",
    slug: "body-contouring",
    name: "High-Definition Body Contouring",
    category: "Body",
    featured: true,
    image: "/assets/services/Body contouring.png",
    shortDescription: "Comprehensive body shaping and skin tightening procedures to create athletic, defined bodily lines.",
    heroHeadline: "Sculpt Athletic Contours and Refined Body Architecture",
    introduction: "High-Definition Body Contouring goes beyond standard fat removal to sculpt the underlying muscular anatomy, creating defined waistlines, athletic abdominal lines, and proportionate body transitions.",
    whatIsIt: "HD Body Contouring utilizes specialized liposculpture and radiofrequency/ultrasound skin tightening technologies to carve muscle grooves and tighten skin along the abdomen, back, flanks, and thighs.",
    benefits: [
      "Sculpted abdominal lines and athletic body definition",
      "Simultaneous fat removal and thermal skin contraction",
      "Enhanced waist-to-hip ratio and aesthetic bodily harmony",
      "Long-lasting permanent definition when weight is maintained",
      "Precise anatomical sculpting tailored for men and women"
    ],
    candidateCriteria: [
      "Individuals near their target weight with good muscle tone beneath surface fat",
      "Patients seeking enhanced anatomical athletic definition",
      "Nonsmokers with elastic skin and healthy medical status"
    ],
    procedureOverview: "Using energy-assisted liposuction technology, deep and superficial fat layers are selectively carved along anatomical muscular landmarks while tightening the overlying dermal layer.",
    recoveryInfo: "Specialized foam compression garments are worn for 4 weeks to promote smooth adherence. Normal non-strenuous daily work resumes in 4–7 days.",
    faqs: [
      {
        question: "How is HD Body Contouring different from regular liposuction?",
        answer: "Regular liposuction focuses on volume reduction, whereas HD Body Contouring selectively highlights anatomical muscle grooves (such as abdominal lines and obliques)."
      }
    ],
    relatedServiceSlugs: ["liposuction", "tummy-tuck", "butt-lift"]
  },
  {
    id: "facial-rejuvenation",
    slug: "facial-rejuvenation",
    name: "Facial Rejuvenation",
    category: "Face",
    featured: true,
    image: "/assets/services/Facial rejuvenation.png",
    shortDescription: "Surgical and non-surgical facial treatments to smooth wrinkles, restore volume, and revive youthful skin brilliance.",
    heroHeadline: "Revive Youthful Vitality and Natural Radiance to Your Face",
    introduction: "Facial aging involves skin laxity, volume loss, and wrinkle formation. Our facial rejuvenation protocols combine advanced surgical tightening with medical-grade skin treatments to restore youthful vitality without looking artificial.",
    whatIsIt: "A comprehensive umbrella of aesthetic treatments including fat grafting, laser resurfacing, chemical peels, dermal fillers, and mini-facelifts customized to address specific age-related changes.",
    benefits: [
      "Smooths deep facial lines, nasolabial folds, and wrinkles",
      "Restores lost cheek, temple, and under-eye volume",
      "Improves skin texture, tone, and collagen production",
      "Customized combination of non-surgical or surgical modalities",
      "Natural-looking refreshed appearance without stiffness"
    ],
    candidateCriteria: [
      "Men and women noticing skin laxity, fine lines, volume loss, or dull tone",
      "Patients wanting customized anti-aging prevention or restoration",
      "Healthy adults seeking youthful facial revitalization"
    ],
    procedureOverview: "Depending on individual needs, procedures range from 30-minute laser and injectable sessions to minor surgical autologous fat transfer under local anesthesia.",
    recoveryInfo: "Non-surgical treatments have zero to 2 days of minor redness. Surgical volume restoration or laser therapy may require 5–7 days of skin recovery.",
    faqs: [
      {
        question: "What age is appropriate for facial rejuvenation?",
        answer: "Facial rejuvenation is customized for all adult ages—preventative treatments in the 30s, volume restoration in the 40s, and structural rejuvenation in the 50s and beyond."
      }
    ],
    relatedServiceSlugs: ["facelift", "buccal-fat-removal", "rhinoplasty"]
  },
  {
    id: "breast-procedures",
    slug: "breast-procedures",
    name: "Breast Procedures (Augmentation & Balance)",
    category: "Breast",
    featured: true,
    image: "/assets/services/Breast lift surgery.png",
    shortDescription: "Harmonious breast enhancement, volume restoration, and symmetry correction tailored to your body.",
    heroHeadline: "Achieve Natural Breast Proportion and Confident Silhouette",
    introduction: "Breast procedures encompass silicone implant augmentation, fat transfer augmentation, and symmetry corrections designed to enhance volume, firmness, and natural cleavage proportions.",
    whatIsIt: "Breast augmentation and balancing procedures place high-cohesive gel implants or autologous fat into the submammary space to increase size, improve fullness, or correct developmental asymmetry.",
    benefits: [
      "Enhanced breast volume, upper pole fullness, and cleavage",
      "Correction of asymmetry between breasts",
      "High-grade US FDA approved cohesive silicone gel implants",
      "Concealed incisions in natural infra-mammary or periareolar creases",
      "Long-lasting aesthetic balance customized to torso width"
    ],
    candidateCriteria: [
      "Women seeking increased breast size, volume restoration after weight loss/pregnancy",
      "Patients with asymmetrical breast volume or shape",
      "Women in good general health with realistic surgical goals"
    ],
    procedureOverview: "Implants are placed beneath the pectoral muscle or breast tissue through small concealed incisions during a 90-minute outpatient surgical procedure under general anesthesia.",
    recoveryInfo: "A supportive surgical bra is worn for 4 weeks. Most patients resume office work in 5–7 days, avoiding strenuous upper body workouts for 4–6 weeks.",
    faqs: [
      {
        question: "Are cohesive gel implants safe?",
        answer: "Yes, modern US FDA-approved cohesive gel implants are engineered for high safety, durability, and a natural soft tactile feel."
      }
    ],
    relatedServiceSlugs: ["breast-lift", "breast-reduction", "mommy-makeover"]
  },
  {
    id: "tummy-tuck",
    slug: "tummy-tuck",
    name: "Tummy Tuck / Abdominoplasty",
    category: "Body",
    featured: true,
    image: "/assets/services/Tummy tuck surgery.png",
    shortDescription: "Surgical removal of loose abdominal skin and repair of underlying split abdominal muscles for a flat waistline.",
    heroHeadline: "Flatten and Restore Your Abdominal Contour and Waistline",
    introduction: "Abdominoplasty (Tummy Tuck) addresses loose skin, stretched abdominal muscles, and excess lower abdominal tissue that cannot be corrected through exercise alone.",
    whatIsIt: "Surgical procedure that removes hanging abdominal skin, performs muscular repair of diastasis recti, relocates the navel aesthetically, and tightens the central torso wall.",
    benefits: [
      "Removes overhanging skin folds and apron-like abdominal tissue",
      "Tightens separated core abdominal wall muscles (diastasis recti)",
      "Creates a firm, flat, and sculpted waistline",
      "Removes lower abdominal stretch marks within excised skin zone",
      "Improves posture and core abdominal support"
    ],
    candidateCriteria: [
      "Men and women with excess loose abdominal skin after significant weight loss or pregnancy",
      "Patients with weakened core abdominal muscles",
      "Non-smokers at a stable body weight"
    ],
    procedureOverview: "A low bikini-line incision is made. The abdominal fascia is tightened with permanent sutures, excess skin is trimmed, and the belly button is repositioned in a natural contour.",
    recoveryInfo: "Drainage tubes and compression garments are managed during the first 7-10 days. Walking upright returns fully by week 2, with normal work resumed at 2-3 weeks.",
    faqs: [
      {
        question: "Where is the abdominoplasty scar located?",
        answer: "The scar is positioned horizontally low across the lower abdomen so it remains completely hidden within standard swimwear and undergarments."
      }
    ],
    relatedServiceSlugs: ["liposuction", "mommy-makeover", "body-contouring"]
  },
  {
    id: "lip-augmentation",
    slug: "lip-augmentation",
    name: "Lip Augmentation & Sculpting",
    category: "Face",
    featured: true,
    image: "/assets/services/Lip augmentation.png",
    shortDescription: "Precision lip sculpting with dermal fillers or fat grafting for plump, symmetrical, and youthful lips.",
    heroHeadline: "Enhance Lip Volume, Symmetry, and Cupid’s Bow Definition",
    introduction: "Full, well-defined lips are a symbol of youth and facial attractiveness. Lip augmentation at Sculpt Aesthetics subtly enhances volume, defines lip borders, and corrects asymmetry.",
    whatIsIt: "Treatment utilizing hyaluronic acid dermal fillers or microscopic autologous fat transfer to refine lip fullness, hydrate vertical lip lines, and enhance the cupid’s bow.",
    benefits: [
      "Immediate enhancement of lip volume and natural softness",
      "Enhanced cupid's bow and vermilion border definition",
      "Correction of upper and lower lip volume imbalance",
      "Smooths fine vertical lines around the mouth",
      "Reversible and customizable treatment options"
    ],
    candidateCriteria: [
      "Individuals with naturally thin or age-thinning lips",
      "Patients seeking improved lip balance or border definition",
      "Healthy adults with realistic expectations"
    ],
    procedureOverview: "Under topical numbing cream, precise micro-injections of premium hyaluronic acid filler are administered along key anatomical lip zones in a 20-minute procedure.",
    recoveryInfo: "Minor swelling resolves in 24–48 hours. Immediate results with full final appearance settling at 3–5 days.",
    faqs: [
      {
        question: "How long do lip fillers last?",
        answer: "Hyaluronic acid lip fillers typically last 9 to 12 months, after which they naturally dissolve and can be refreshed."
      }
    ],
    relatedServiceSlugs: ["facial-rejuvenation", "buccal-fat-removal", "rhinoplasty"]
  },
  {
    id: "buccal-fat-removal",
    slug: "buccal-fat-removal",
    name: "Buccal Fat Pad Removal",
    category: "Face",
    featured: false,
    image: "/assets/services/Buccal fat pad removal.png",
    shortDescription: "Targeted cheek fat reduction to carve sculpted cheekbones and refine a rounded lower face.",
    heroHeadline: "Sculpt High Cheekbones and Refine Facial Contours",
    introduction: "Buccal Fat Pad Removal reduces rounded 'baby face' fullness in the lower cheeks to highlight natural cheekbone structures and create a chiseled facial profile.",
    whatIsIt: "A quick intraoral surgical procedure that extracts the buccal fat pads located inside the cheek cavity through microscopic incisions inside the mouth.",
    benefits: [
      "Permanently reduces round cheek fullness",
      "Highlights cheekbone projection and jawline contour",
      "Zero external visible scars (incisions are inside the mouth)",
      "Short 30-minute procedure under local anesthesia",
      "Quick recovery with minimal disruption"
    ],
    candidateCriteria: [
      "Adults with naturally chubby or round cheeks despite low body weight",
      "Patients seeking an angular, sculpted facial appearance",
      "Nonsmokers with good oral hygiene"
    ],
    procedureOverview: "Small 1cm incisions are made inside the mouth opposite the upper molar teeth. The cheek fat pads are gently teased out, excised, and closed with self-dissolving sutures.",
    recoveryInfo: "Soft diet for 3–5 days alongside antiseptic mouthwashes. Swelling dissipates in 7–10 days, revealing final sculpted contours at 4–6 weeks.",
    faqs: [
      {
        question: "Will buccal fat removal leave scars on my face?",
        answer: "No. The procedure is performed completely inside the mouth, leaving no external visible scars whatsoever."
      }
    ],
    relatedServiceSlugs: ["facial-rejuvenation", "rhinoplasty", "lip-augmentation"]
  },
  {
    id: "labiaplasty",
    slug: "labiaplasty",
    name: "Labiaplasty",
    category: "Intimate",
    featured: false,
    image: "/assets/services/Labiaplasty.png",
    shortDescription: "Discreet surgical reshaping of the labia minora for functional comfort, aesthetic symmetry, and confidence.",
    heroHeadline: "Restore Intimate Comfort, Symmetry, and Confidence",
    introduction: "Labiaplasty addresses enlarged, elongated, or asymmetrical labia minora that cause physical discomfort during exercise, clothing friction, or intimate distress.",
    whatIsIt: "Surgical trimming and reshaping of excess labia minora tissue to achieve natural symmetry and comfort while preserving sensitive neural structures.",
    benefits: [
      "Eliminates pinching, pulling, and discomfort during sports or tight clothing",
      "Achieves neat, symmetrical, and comfortable intimate aesthetics",
      "Preserves natural sensation and delicate tissue margins",
      "Perceived boost in personal comfort and self-esteem",
      "Discreet, confidential outpatient surgical care"
    ],
    candidateCriteria: [
      "Women experiencing physical discomfort, irritation, or self-consciousness due to enlarged labia",
      "Women in good general health with clear aesthetic goals",
      "Non-pregnant adults with healthy tissue"
    ],
    procedureOverview: "Performed under local anesthesia or sedation using precise trim or wedge excision techniques. Dissolvable microscopic sutures close the refined tissue borders.",
    recoveryInfo: "Rest for 3–5 days with cold compress application. Light walking is fine immediately. Avoid sexual activity and tampons for 4–6 weeks.",
    faqs: [
      {
        question: "Does labiaplasty affect sexual sensation?",
        answer: "No. The nerve pathways supplying sensation are carefully preserved by experienced plastic surgeons."
      }
    ],
    relatedServiceSlugs: ["clitoral-hood-correction", "g-spot-amplification", "hymenoplasty"]
  },
  {
    id: "butt-lift",
    slug: "butt-lift",
    name: "Butt Lift & Augmentation",
    category: "Body",
    featured: false,
    image: "/assets/services/Buttock.png",
    shortDescription: "Contouring and volume enhancement of the gluteal region using autologous fat transfer or surgical lifting.",
    heroHeadline: "Sculpt Full, Lifted, and Proportionate Gluteal Curves",
    introduction: "Gluteal sculpting enhances buttock volume, projection, and shape to achieve an attractive hourglass silhouette using your body's natural fat reserves.",
    whatIsIt: "Commonly known as a Brazilian Butt Lift (BBL), this procedure uses liposuction to harvest fat from the waist/flanks and micro-injects purified fat into the gluteal muscles.",
    benefits: [
      "Restores volume and projection to flat or sagging buttocks",
      "Slims the waistline and lower back simultaneously via liposuction",
      "Uses 100% natural autologous tissue with soft touch",
      "Improves overall body proportions and clothing fit",
      "Long-lasting permanent fat integration"
    ],
    candidateCriteria: [
      "Patients seeking fuller, firmer gluteal contours",
      "Individuals with sufficient donor fat in abdomen, flanks, or thighs",
      "Nonsmokers capable of avoiding direct sitting on buttocks during early recovery"
    ],
    procedureOverview: "Liposuction harvests fat from waist and thighs. Harvested fat is centrifuged and purified, then meticulously reinjected in small aliquots into gluteal tissue planes.",
    recoveryInfo: "Special BBL pillow used to avoid direct pressure on buttocks when sitting for 3 weeks. Compression garment worn for 6 weeks.",
    faqs: [
      {
        question: "How long does transferred fat last?",
        answer: "Roughly 60-70% of transferred fat cells permanently integrate into the target area and behave like normal body tissue."
      }
    ],
    relatedServiceSlugs: ["liposuction", "body-contouring", "tummy-tuck"]
  },
  {
    id: "blepharoplasty",
    slug: "blepharoplasty",
    name: "Blepharoplasty (Eyelid Surgery)",
    category: "Face",
    featured: false,
    image: "/assets/services/Blepharoplasty.png",
    shortDescription: "Surgical removal of drooping upper eyelid skin and under-eye bags for a youthful, awake gaze.",
    heroHeadline: "Rejuvenate Tired Eyes and Restore a Bright, Youthful Gaze",
    introduction: "Eyelid surgery (Blepharoplasty) corrects drooping upper lids and puffy under-eye bags that create a tired or aged appearance and can impair peripheral vision.",
    whatIsIt: "Plastic surgery that excises excess skin, muscle, and herniated fat pads from the upper and lower eyelids to refresh the periorbital facial area.",
    benefits: [
      "Removes heavy, sagging upper eyelid skin folds",
      "Eliminates stubborn under-eye bags and puffiness",
      "Improves obstructed upper peripheral vision field",
      "Concealed incisions inside natural eyelid creases",
      "Long-lasting refreshed and youthful eye appearance"
    ],
    candidateCriteria: [
      "Adults with excess upper lid skin or under-eye fat bags",
      "Patients without severe dry eye syndrome or untreated glaucoma",
      "Nonsmokers seeking a refreshed periorbital appearance"
    ],
    procedureOverview: "Under local anesthesia, upper eyelid incisions are hidden within the natural lid crease. Lower eyelid fat pads are removed or repositioned via transconjunctival or subciliary incisions.",
    recoveryInfo: "Mild bruising and swelling peak at 3 days and resolve by day 10. Sutures are removed at 5 days, returning to public activities in 1 week.",
    faqs: [
      {
        question: "Will eyelid surgery leave noticeable scars?",
        answer: "Upper eyelid scars rest invisibly within natural lid folds. Lower lid incisions are placed inside the eyelid or right below lower lashes."
      }
    ],
    relatedServiceSlugs: ["facelift", "facial-rejuvenation", "rhinoplasty"]
  },
  {
    id: "hymenoplasty",
    slug: "hymenoplasty",
    name: "Hymenoplasty",
    category: "Intimate",
    featured: false,
    image: "/assets/services/Hymenoplasty.png",
    shortDescription: "Surgical reconstruction of the hymenal membrane performed under strict clinical confidentiality.",
    heroHeadline: "Confidential Intimate Surgical Reconstruction",
    introduction: "Hymenoplasty (hymen restoration) is a delicate intimate surgical procedure performed with high precision and absolute patient confidentiality.",
    whatIsIt: "Reconstructive procedure that carefully re-approximates torn hymenal tissue remnants using microscopic dissolvable sutures to reconstruct an intact membrane.",
    benefits: [
      "Surgical reconstruction of the hymenal layer",
      "100% confidential, respectful, and compassionate care",
      "Outpatient procedure under local anesthesia",
      "Dissolvable sutures requiring no removal",
      "Quick healing timeline"
    ],
    candidateCriteria: [
      "Women seeking confidential hymenal reconstruction for personal, cultural, or physical reasons",
      "Healthy adults with realistic expectations"
    ],
    procedureOverview: "Performed under local anesthesia in 45 minutes. Remaining tissue edges are sutured in a fine layer using delicate bio-absorbable thread.",
    recoveryInfo: "Light rest for 2 days. Normal light activities resume quickly. Full tissue healing occurs in 3–4 weeks.",
    faqs: [
      {
        question: "Is the consultation completely private?",
        answer: "Yes, all consultations and medical records at Sculpt Aesthetics are strictly confidential under medical privacy standards."
      }
    ],
    relatedServiceSlugs: ["labiaplasty", "clitoral-hood-correction", "g-spot-amplification"]
  },
  {
    id: "clitoral-hood-correction",
    slug: "clitoral-hood-correction",
    name: "Clitoral Hood Correction",
    category: "Intimate",
    featured: false,
    image: "/assets/services/Clitoral hood correction.png",
    shortDescription: "Refinement of excess clitoral prepuce skin for enhanced intimate comfort and aesthetic harmony.",
    heroHeadline: "Precision Intimate Refinement for Enhanced Comfort",
    introduction: "Clitoral hood reduction reduces redundant skin folds covering the clitoris to improve hygiene, intimate sensitivity, and aesthetic balance alongside labiaplasty.",
    whatIsIt: "Surgical trimming of excess prepuce tissue along the side borders while safeguarding central erectile and sensory nerve structures.",
    benefits: [
      "Reduces excess tissue bulk in the upper labial area",
      "Improves intimate hygiene and comfort",
      "Can enhance intimate responsiveness and sensitivity",
      "Seamlessly paired with labiaplasty for balanced aesthetics",
      "Discreet outpatient surgical execution"
    ],
    candidateCriteria: [
      "Women troubled by excess prepuce tissue or irritation",
      "Patients seeking intimate aesthetic refinement"
    ],
    procedureOverview: "Under local anesthesia, excess prepuce tissue folds are trimmed laterally with micro-precision instruments and closed with fine dissolvable sutures.",
    recoveryInfo: "Rest for 3 days. Dissolvable stitches melt naturally. Resume intimacy after 4–6 weeks.",
    faqs: [
      {
        question: "Can clitoral hood correction be combined with labiaplasty?",
        answer: "Yes, they are frequently performed together in a single brief session for uniform intimate contours."
      }
    ],
    relatedServiceSlugs: ["labiaplasty", "g-spot-amplification", "hymenoplasty"]
  },
  {
    id: "g-spot-amplification",
    slug: "g-spot-amplification",
    name: "G-Spot Amplification",
    category: "Intimate",
    featured: false,
    image: "/assets/services/G-spot amplification.png",
    shortDescription: "Non-surgical collagen or hyaluronan injection designed to increase sensory intimate responsiveness.",
    heroHeadline: "Non-Surgical Intimate Wellness & Heightened Sensitivity",
    introduction: "G-Spot Amplification (G-Shot) is a brief non-surgical treatment designed to temporarily expand and elevate the erogenous tissue zone on the anterior vaginal wall.",
    whatIsIt: "A specialized injection of biocompatible collagen or hyaluronic acid filler into the submucosal vaginal tissue to increase projection and tactile contact.",
    benefits: [
      "Non-surgical 15-minute clinical treatment",
      "Zero downtime with immediate return to regular activities",
      "Heightened intimate friction and tactile responsiveness",
      "Safe biocompatible dermal filler formula"
    ],
    candidateCriteria: [
      "Women seeking non-surgical enhancement of intimate gratification",
      "Healthy adults without active pelvic infections"
    ],
    procedureOverview: "A local anesthetic is applied to the anterior vaginal wall, followed by a targeted injection of filler into the designated submucosal zone.",
    recoveryInfo: "Zero downtime. Sexual intimacy can typically be resumed 48 hours post-treatment.",
    faqs: [
      {
        question: "How long do the results of G-spot amplification last?",
        answer: "Results typically last 4 to 6 months as the biocompatible filler gradually absorbs naturally."
      }
    ],
    relatedServiceSlugs: ["labiaplasty", "clitoral-hood-correction"]
  },
  {
    id: "split-ear-lobe",
    slug: "split-ear-lobe",
    name: "Split Ear Lobe Repair",
    category: "Minor Surgical",
    featured: false,
    image: "/assets/services/A split earlobe.png",
    shortDescription: "Quick in-clinic repair of torn, stretched, or split earlobe clefts from heavy earrings.",
    heroHeadline: "Restore Torn or Stretched Earlobes with Flawless Precision",
    introduction: "Earlobes torn completely or stretched elongated by heavy jewelry can be reconstructed in a quick, painless 30-minute in-office procedure.",
    whatIsIt: "Minor surgical repair that removes internal scarred skin lining of the tear and re-joins fresh tissue margins with fine sutures.",
    benefits: [
      "Painless 30-minute in-office minor procedure under local anesthesia",
      "Restores smooth, rounded, natural earlobe geometry",
      "Allows re-piercing of earlobes after 6–8 weeks",
      "Virtually invisible fine scar post-healing",
      "Immediate return to work and daily activities"
    ],
    candidateCriteria: [
      "Individuals with split, torn, or widened earlobe earring holes",
      "Patients wanting to wear normal earrings again"
    ],
    procedureOverview: "Local anesthetic numbs the earlobe. The epithelialized tract inside the split is excised and closed with delicate micro-sutures.",
    recoveryInfo: "Keep earlobe clean and dry for 5 days. Sutures removed in 7 days. Re-piercing can be safely performed after 6–8 weeks.",
    faqs: [
      {
        question: "When can I pierce my earlobes again after repair?",
        answer: "Earlobes can be re-pierced after 6 to 8 weeks, slightly to the side of the healed surgical line."
      }
    ],
    relatedServiceSlugs: ["lipoma-removal", "dimple-creation"]
  },
  {
    id: "facelift",
    slug: "facelift",
    name: "Face Lift Surgery",
    category: "Face",
    featured: false,
    image: "/assets/services/A facelift.png",
    shortDescription: "Surgical lifting of SMAS facial muscle layer and skin to eliminate sagging jawlines and neck folds.",
    heroHeadline: "Revert Facial Aging with Structural SMAS Facelift Architecture",
    introduction: "A surgical Facelift (Rhytidectomy) provides deep structural elevation of sagging cheek fat, jowels, and loose neck skin for dramatic, natural anti-aging results.",
    whatIsIt: "Comprehensive plastic surgery that tightens the underlying SMAS muscle layer, repositions mid-face tissues, and removes excess skin along hairline incisions.",
    benefits: [
      "Restores sharp jawline definition and youthful cheek elevation",
      "Eliminates sagging jowels and turkey-neck skin folds",
      "Tightens deep muscular SMAS foundation for long-lasting results",
      "Natural un-operated appearance without skin tightness",
      "Turns back the aesthetic clock by 10 to 15 years"
    ],
    candidateCriteria: [
      "Men and women with significant facial sagging, deep jowls, or neck laxity",
      "Nonsmokers in good systemic health with reasonable skin elasticity"
    ],
    procedureOverview: "Incisions wrap around the ear cartilage and into the hairline. The SMAS muscle layer is elevated and anchored, excess skin is trimmed, and incisions are closed under zero tension.",
    recoveryInfo: "Swelling and bruising resolve in 10–14 days. Social activities and work resume comfortably by week 2 to 3.",
    faqs: [
      {
        question: "How many years younger will a facelift make me look?",
        answer: "A well-performed SMAS facelift typically turns back facial appearance by 10 to 15 years, with results enduring for over a decade."
      }
    ],
    relatedServiceSlugs: ["facial-rejuvenation", "blepharoplasty", "rhinoplasty"]
  },
  {
    id: "breast-lift",
    slug: "breast-lift",
    name: "Breast Lift Surgery (Mastopexy)",
    category: "Breast",
    featured: false,
    image: "/assets/services/Breast lift surgery.png",
    shortDescription: "Surgical elevation and reshaping of sagging breast tissue and repositioning of drooping nipples.",
    heroHeadline: "Elevate and Reshape Sagging Breasts for a Perky Profile",
    introduction: "Breast Lift (Mastopexy) elevates drooping breast tissue, tightens stretched skin envelopes, and repositions lower-pointing nipples to a youthful height.",
    whatIsIt: "Surgical procedure that removes excess skin, reshapes internal breast tissue, and elevates the nipple-areolar complex without necessarily altering total volume.",
    benefits: [
      "Elevates sagging, drooping breasts to a perky, firm position",
      "Repositions lower-facing nipples to central youthful placement",
      "Reduces enlarged stretched areolas",
      "Improves upper breast fullness and cleavage firmness",
      "Can be combined with implants for extra volume"
    ],
    candidateCriteria: [
      "Women with sagging breasts or downward pointing nipples due to weight loss, pregnancy, or aging",
      "Women seeking perkier breast shape and position"
    ],
    procedureOverview: "Excess lower skin is removed via periareolar or vertical incisions. Breast tissue is elevated, anchored, and skin is redraped around the newly positioned nipple.",
    recoveryInfo: "Supportive surgical bra worn for 4 weeks. Return to desk work in 5–7 days; avoid heavy physical exercise for 4 weeks.",
    faqs: [
      {
        question: "Is a breast lift the same as breast augmentation?",
        answer: "No. A lift repositions and tightens sagging tissue, whereas augmentation adds volume using implants. They can be combined if both volume and lift are desired."
      }
    ],
    relatedServiceSlugs: ["breast-procedures", "breast-reduction", "mommy-makeover"]
  },
  {
    id: "dimple-creation",
    slug: "dimple-creation",
    name: "Dimple Creation (Dimpleplasty)",
    category: "Face",
    featured: false,
    image: "/assets/services/Creating dimples.png",
    shortDescription: "Quick, minor surgical creation of natural, charming facial cheek dimples.",
    heroHeadline: "Add Charming Natural Cheek Dimples in a Quick 20-Minute Procedure",
    introduction: "Dimples add charm and warmth to a smile. Dimpleplasty creates permanent, natural-looking cheek dimples through a quick, painless minor procedure.",
    whatIsIt: "A minor surgical technique that creates a tiny adhesion between the cheek skin and underlying buccinators muscle inside the mouth.",
    benefits: [
      "Quick 20-minute procedure under local anesthesia",
      "Zero external scars (performed entirely inside the mouth)",
      "Creates natural dimples that appear dynamically when smiling",
      "Customizable depth and placement on cheeks",
      "Fast healing timeline"
    ],
    candidateCriteria: [
      "Anyone desiring natural facial cheek dimples",
      "Healthy adults with good oral hygiene"
    ],
    procedureOverview: "Under local anesthesia, a tiny absorbable suture is passed through the inner cheek muscle to bind the dermal underside, creating a natural indentation upon smiling.",
    recoveryInfo: "Dimple is present continuously for the first 1–2 weeks, then settles naturally so it appears only when smiling or laughing.",
    faqs: [
      {
        question: "Will the dimple show all the time or only when I smile?",
        answer: "After initial healing (2-3 weeks), the dimple will appear dynamically only when you smile, laugh, or animate your facial muscles."
      }
    ],
    relatedServiceSlugs: ["buccal-fat-removal", "lip-augmentation", "split-ear-lobe"]
  },
  {
    id: "circumcision",
    slug: "circumcision",
    name: "Circumcision Surgery",
    category: "Minor Surgical",
    featured: false,
    image: "/assets/services/Circumcision.png",
    shortDescription: "Modern painless ZSR stapler or laser circumcision for adult and pediatric medical comfort.",
    heroHeadline: "Painless Modern Laser & Stapler Circumcision Surgery",
    introduction: "Sculpt Aesthetics performs advanced laser and ZSR stapler circumcision for phimosis, paraphimosis, recurrent infections, or personal hygienic preference.",
    whatIsIt: "Precision removal of redundant penile foreskin using bloodless laser or single-use surgical staplers ensuring smooth, rapid healing.",
    benefits: [
      "Painless laser or ZSR stapler technology",
      "Virtually bloodless procedure with zero stitches required",
      "30-minute day-care procedure under local/regional block",
      "Prevents recurrent balanitis and phimosis pain",
      "Rapid recovery with clean aesthetic outline"
    ],
    candidateCriteria: [
      "Men experiencing tight foreskin (phimosis), tearing, or recurrent infections",
      "Individuals seeking circumcision for hygiene or personal reasons"
    ],
    procedureOverview: "Using local anesthesia blocks, the foreskin is measured and removed with a ZSR device or CO2 laser, sealing tissue edges simultaneously.",
    recoveryInfo: "Stapler ring falls off automatically within 10–14 days. Daily work resumes in 2 days; intimacy can be resumed after 4 weeks.",
    faqs: [
      {
        question: "Is laser circumcision painless?",
        answer: "Yes, local anesthetic blocks ensure total painlessness during surgery, and post-operative discomfort is minimal."
      }
    ],
    relatedServiceSlugs: ["lipoma-removal", "gynecomastia"]
  },
  {
    id: "lipoma-removal",
    slug: "lipoma-removal",
    name: "Lipoma Removal",
    category: "Minor Surgical",
    featured: false,
    image: "/assets/services/lipoma.png",
    shortDescription: "Seamless surgical extraction of benign fatty lumps under local anesthesia with minimal scarring.",
    heroHeadline: "Complete Removal of Benign Lipomas with Minimal Scarring",
    introduction: "Lipomas are benign fatty growths lying under the skin. Plastic surgical removal ensures complete capsule extraction to prevent recurrence while leaving minimal cosmetic marks.",
    whatIsIt: "In-clinic minor surgical excision or micro-incision extraction of subcutaneous fatty lipoma tumors.",
    benefits: [
      "Complete removal of single or multiple lipomas",
      "Prevents future enlargement or nerve compression discomfort",
      "Micro-incisions closed with cosmetic plastic surgery sutures",
      "In-office 20-minute procedure under local anesthesia",
      "Histopathology verification provided"
    ],
    candidateCriteria: [
      "Individuals with palpable, growing, or bothersome subcutaneous lipoma lumps",
      "Patients seeking neat cosmetic scar removal"
    ],
    procedureOverview: "Local anesthesia numbs the lump. A tiny incision directly over the lipoma allows complete capsule shelling out, followed by fine cosmetic skin closure.",
    recoveryInfo: "Normal activities immediately. Sutures removed in 7 days.",
    faqs: [
      {
        question: "Can lipomas turn cancerous?",
        answer: "Lipomas are strictly benign fatty tumors. All excised specimens are sent for routine biopsy confirmation."
      }
    ],
    relatedServiceSlugs: ["split-ear-lobe", "circumcision"]
  },
  {
    id: "arm-and-thigh-lift",
    slug: "arm-and-thigh-lift",
    name: "Arm & Thigh Lift",
    category: "Body",
    featured: false,
    image: "/assets/services/Arm and thigh lift.png",
    shortDescription: "Surgical tightening of loose 'bat wing' arm skin and sagging inner thigh skin folds.",
    heroHeadline: "Firm and Reshape Loose Arm and Thigh Skin Contours",
    introduction: "Significant weight loss or aging can leave loose, sagging skin hanging from the upper arms (brachioplasty) and inner thighs (thighplasty). This surgery restores firm, smooth limbs.",
    whatIsIt: "Plastic surgery that excises excess skin folds and fat along the inner arm or inner thigh, anchoring dermal layers for slim, toned limbs.",
    benefits: [
      "Removes sagging 'bat wing' arm skin flaps",
      "Tightens chafing inner thigh skin folds",
      "Smooths limb contours for comfortably fitting clothing",
      "Combines with liposuction for maximum limb slimming",
      "Restores athletic arm and leg proportions"
    ],
    candidateCriteria: [
      "Individuals with loose hanging arm or thigh skin after major weight loss",
      "Nonsmokers at a stable body weight"
    ],
    procedureOverview: "Incisions are placed along the inner arm or inner thigh inseam. Excess skin is excised, subcutaneous layers tightened, and skin meticulously closed.",
    recoveryInfo: "Compression sleeves worn for 4 weeks. Normal non-strenuous routines resume in 10–14 days.",
    faqs: [
      {
        question: "Where are arm lift scars located?",
        answer: "Arm lift scars are positioned along the inner or back surface of the upper arm, hidden when arms are by your side."
      }
    ],
    relatedServiceSlugs: ["tummy-tuck", "body-contouring", "liposuction"]
  },
  {
    id: "breast-reduction",
    slug: "breast-reduction",
    name: "Breast Reduction Surgery",
    category: "Breast",
    featured: false,
    image: "/assets/services/Breast reduction.png",
    shortDescription: "Surgical reduction of oversized breasts to relieve physical neck/back pain and achieve comfortable proportions.",
    heroHeadline: "Relieve Physical Discomfort and Achieve Balanced Breast Size",
    introduction: "Overly large breasts (macromastia) cause chronic neck, back, and shoulder pain, skin rashes, and posture issues. Reduction surgery creates light, comfortable, proportionate breasts.",
    whatIsIt: "Surgical removal of excess glandular breast tissue, fat, and skin to resize and lift the breasts to an aesthetically balanced proportion.",
    benefits: [
      "Relieves chronic neck, shoulder groove, and back pain",
      "Eliminates painful skin rashes underneath breast folds",
      "Creates lighter, firmer, and proportionate breasts",
      "Facilitates sports, exercise, and comfortable clothing fit",
      "Lifts sagging breasts simultaneously"
    ],
    candidateCriteria: [
      "Women suffering from physical discomfort due to heavy, oversized breasts",
      "Women seeking a proportionate chest contour in good general health"
    ],
    procedureOverview: "Excess breast tissue and skin are excised via wise-pattern or vertical incisions. The nipple-areola complex is elevated to a central position.",
    recoveryInfo: "Surgical bra worn for 4 weeks. Return to desk work in 10–14 days; avoid strenuous activities for 6 weeks.",
    faqs: [
      {
        question: "Will breast reduction relieve my back pain?",
        answer: "Yes! Over 95% of patients report dramatic immediate relief from chronic neck, shoulder, and back pain following reduction."
      }
    ],
    relatedServiceSlugs: ["breast-procedures", "breast-lift", "mommy-makeover"]
  }
];

export function getFeaturedServices(): ServiceItem[] {
  return servicesData.filter((service) => service.featured);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceItem[] {
  return servicesData.filter((service) => slugs.includes(service.slug));
}
