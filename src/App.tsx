import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminRouteGuard } from './components/AdminRouteGuard';

// Public Pages
import { HomePage } from './pages/HomePage';
import { MedicinesPage } from './pages/MedicinesPage';
import { CommonDrugsPage } from './pages/CommonDrugsPage';
import { MedicineDetailPage } from './pages/MedicineDetailPage';
import { ClassesPage } from './pages/ClassesPage';
import { ClassDetailPage } from './pages/ClassDetailPage';
import { MedicalTermsPage } from './pages/MedicalTermsPage';
import { MedicalTermDetailPage } from './pages/MedicalTermDetailPage';
import { DrugPatternsPage } from './pages/DrugPatternsPage';
import { DrugMemoryPage } from './pages/DrugMemoryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { PronunciationPage } from './pages/PronunciationPage';
import { ComparePage } from './pages/ComparePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyLearningPage } from './pages/MyLearningPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AiAssistantPage } from './pages/AiAssistantPage';

// Phase 6 Learning Pages
import { LearningHubPage } from './pages/learning/LearningHubPage';
import { AdmeLearningPage } from './pages/learning/AdmeLearningPage';
import { PharmacokineticsPage } from './pages/learning/PharmacokineticsPage';
import { PharmacodynamicsPage } from './pages/learning/PharmacodynamicsPage';
import { QuickRevisionPage } from './pages/learning/QuickRevisionPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminMedicinesListPage } from './pages/admin/AdminMedicinesListPage';
import { AdminMedicineEditorPage } from './pages/admin/AdminMedicineEditorPage';
import { AdminImportExportPage } from './pages/admin/AdminImportExportPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="medicines" element={<MedicinesPage />} />
          <Route path="medicines/:id" element={<MedicineDetailPage />} />
          <Route path="common-drugs" element={<CommonDrugsPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="classes/:id" element={<ClassDetailPage />} />
          <Route path="medical-terms" element={<MedicalTermsPage />} />
          <Route path="medical-terms/:id" element={<MedicalTermDetailPage />} />
          <Route path="terms" element={<Navigate to="/medical-terms" replace />} />
          <Route path="drug-patterns" element={<DrugPatternsPage />} />
          <Route path="drug-memory" element={<DrugMemoryPage />} />
          <Route path="pronunciation" element={<PronunciationPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="my-learning" element={<MyLearningPage />} />
          <Route path="ai-assistant" element={<AiAssistantPage />} />

          {/* Phase 6 Pharmacology Learning Routes */}
          <Route path="learning" element={<LearningHubPage />} />
          <Route path="learning/adme" element={<AdmeLearningPage />} />
          <Route path="learning/adme/metabolism" element={<AdmeLearningPage />} />
          <Route path="learning/pharmacokinetics" element={<PharmacokineticsPage />} />
          <Route path="learning/pharmacodynamics" element={<PharmacodynamicsPage />} />
          <Route path="learning/pharmacodynamics/receptors" element={<PharmacodynamicsPage />} />
          <Route path="learning/pharmacodynamics/dose-response" element={<PharmacodynamicsPage />} />
          <Route path="learning/revision" element={<QuickRevisionPage />} />
          <Route path="adme" element={<Navigate to="/learning/adme" replace />} />

          {/* Reserved for Phase 7 */}
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="quiz" element={<QuizPage />} />

          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Admin Protected Routes */}
          <Route path="admin" element={<AdminRouteGuard />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="medicines" element={<AdminMedicinesListPage />} />
            <Route path="medicines/add" element={<AdminMedicineEditorPage />} />
            <Route path="medicines/:id/edit" element={<AdminMedicineEditorPage />} />
            <Route path="import" element={<AdminImportExportPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
