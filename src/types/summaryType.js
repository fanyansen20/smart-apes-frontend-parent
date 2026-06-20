/**
 * @typedef {{
 * header : string
 * score : number
 * }} ScoreTestResults
 */

/**
 * @typedef {{
 * left : string
 * right : string
 * score : number
 * }} ScoreRightLeftTestResults
 */

/**
 * Personalty
 * @typedef {{
 * header: string
 * description: string[]
 * }} SummaryTypePersonality
 *
 * @typedef {{
 * header: string
 * domain: string
 * icon: string
 * personality: string
 * summary: SummaryTypePersonality
 * }} ContentTypePersonality
 */

/**
 * MI
 * @typedef {{
 * headerSummary: string
 * briefSummary: number
 * tableSummary: {
 *  firstRow: string
 *  secondRow: string
 * }[]
 * }} SummaryTypeMI
 *
 * @typedef {{
 * header: string
 * summary: SummaryTypeMI[]
 * }} ContentTypeMI
 */

/**
 * KLD
 * @typedef {{
 * header: string
 * subheader: string
 * type: 'paragraph' | 'list'
 * body: string[]
 * }} SummaryTypeKLD
 *
 * @typedef {{
 * header: string
 * summary: SummaryTypeKLD[]
 * }} ContentTypeKLD
 */

/**
 * SENSORY
 * @typedef {{
 * headerSummary: string
 * descriptionSummary: string[]
 * }} SummaryTypeSensory
 *
 * @typedef {{
 * header: string
 * summary: SummaryTypeSensory[]
 * }} ContentTypeSensory
 *
 */

/**
 * career interest
 * @typedef {{
 * header: string
 * description: string
 * baseCode: string
 * codes: string[]
 * }} SummaryTypeCareer
 *
 * @typedef {{
 * header: string
 * interest: string
 * interestAreas: string[]
 * summary: SummaryTypeCareer
 * }} ContentTypeCareer
 */

export {};
