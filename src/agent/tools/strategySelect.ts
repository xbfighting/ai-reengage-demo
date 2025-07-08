import { UserProfile } from '@/lib/types';

export interface MarketingStrategy {
  templateId: string;
  confidence: number; // 0-100
  reason: string;
  suggestedVariables: Record<string, string | number>;
}

export function selectMarketingStrategy(userProfile: UserProfile): MarketingStrategy {
  const strategies: MarketingStrategy[] = [];

  // 分析用户特征来选择最佳策略

  // 1. 节日问候 - 适合高忠诚度用户
  if ((userProfile.loyaltyScore ?? 0) > 70) {
    strategies.push({
      templateId: 'holiday_greeting',
      confidence: Math.min(95, (userProfile.loyaltyScore ?? 0) + 10),
      reason: `High loyalty score (${userProfile.loyaltyScore}) indicates strong relationship - perfect for holiday greetings`,
      suggestedVariables: {
        holidayName: 'Holiday Season',
        discount: '20',
        primaryProcedure: userProfile.surgery_history?.[0]?.type || 'Botox',
        validUntil: '2025-12-31',
        location: userProfile.locationLevel || 'your area'
      }
    });
  }

  // 2. 复购提醒 - 适合有手术历史且时间较长的用户
  if (userProfile.surgery_history && userProfile.surgery_history.length > 0) {
    const lastSurgery = userProfile.surgery_history[userProfile.surgery_history.length - 1];
    const monthsSince = userProfile.monthsSince ?? 12;

    if (monthsSince >= 6) {
      const confidence = Math.min(90, 60 + monthsSince * 2);
      strategies.push({
        templateId: 'repurchase_reminder',
        confidence,
        reason: `${monthsSince} months since last ${lastSurgery.type} - optimal time for maintenance`,
        suggestedVariables: {
          monthsSince: monthsSince.toString(),
          lastProcedure: lastSurgery.type,
          primaryProcedure: lastSurgery.type,
          discount: '15',
          location: userProfile.locationLevel || 'your area'
        }
      });
    }
  }

  // 3. 新产品推荐 - 适合喜欢尝试新事物的用户
  if (userProfile.traits?.includes('Likes trying new things') ||
      userProfile.riskPreference === 'Adventurous' ||
      (userProfile.appointmentActivity ?? 0) > 70) {

    strategies.push({
      templateId: 'new_product_recommendation',
      confidence: 75 + (userProfile.appointmentActivity ?? 0) * 0.2,
      reason: `User shows ${userProfile.riskPreference} risk preference and high engagement - ideal for new products`,
      suggestedVariables: {
        newProductName: 'Advanced Skin Rejuvenation',
        primaryProcedure: userProfile.surgery_history?.[0]?.type || 'aesthetic treatments',
        referralSource: userProfile.referralSource || 'valued customer',
        trialDiscount: '25'
      }
    });
  }

  // 选择置信度最高的策略
  strategies.sort((a, b) => b.confidence - a.confidence);

  return strategies[0] || {
    templateId: 'holiday_greeting',
    confidence: 50,
    reason: 'Default strategy - holiday greeting is universally applicable',
    suggestedVariables: {
      holidayName: 'Season',
      discount: '15',
      primaryProcedure: 'treatment',
      validUntil: '2025-12-31',
      location: 'your area'
    }
  };
}

export function analyzeUserSegment(userProfile: UserProfile): {
  segment: string;
  characteristics: string[];
  marketingApproach: string;
} {
  const characteristics: string[] = [];
  let segment = 'Standard';
  let marketingApproach = 'Balanced approach';

  // 分析年龄段
  if (userProfile.age < 30) {
    characteristics.push('Young demographic');
    segment = 'Millennial';
    marketingApproach = 'Trend-focused, social media savvy';
  } else if (userProfile.age >= 45) {
    characteristics.push('Mature demographic');
    segment = 'Premium';
    marketingApproach = 'Quality-focused, relationship-based';
  }

  // 分析消费能力
  if ((userProfile.spendingLevel ?? 0) > 80) {
    characteristics.push('High spender');
    segment = 'VIP';
    marketingApproach = 'Luxury positioning, exclusive offers';
  }

  // 分析忠诚度
  if ((userProfile.loyaltyScore ?? 0) > 85) {
    characteristics.push('Highly loyal');
    marketingApproach += ', loyalty rewards';
  }

  // 分析风险偏好
  if (userProfile.riskPreference === 'Conservative') {
    characteristics.push('Risk-averse');
    marketingApproach += ', emphasize safety and proven results';
  } else if (userProfile.riskPreference === 'Adventurous') {
    characteristics.push('Early adopter');
    marketingApproach += ', highlight innovation and latest trends';
  }

  return { segment, characteristics, marketingApproach };
}
