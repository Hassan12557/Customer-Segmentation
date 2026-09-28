import os
import joblib
import numpy as np
import pandas as pd

class ModelPredictor:
    def __init__(self):
        # Base path pointing to root models/ directory
        self.base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../models"))
        self.model = None
        self.scaler = None
        self.pca = None
        self.load_artifacts()

    def load_artifacts(self):
        """Loads trained sklearn/pipeline models from the models/ directory."""
        pipeline_path = os.path.join(self.base_dir, "full_pipeline.pkl")
        kmeans_path = os.path.join(self.base_dir, "kmeans_model.pkl")
        scaler_path = os.path.join(self.base_dir, "scaler.pkl")
        pca_path = os.path.join(self.base_dir, "pca.pkl")

        if os.path.exists(pipeline_path):
            self.model = joblib.load(pipeline_path)
            print("Loaded full_pipeline.pkl successfully.")
        else:
            if os.path.exists(kmeans_path):
                self.model = joblib.load(kmeans_path)
            if os.path.exists(scaler_path):
                self.scaler = joblib.load(scaler_path)
            if os.path.exists(pca_path):
                self.pca = joblib.load(pca_path)
            print("Loaded individual model artifacts from models/ directory.")

    def predict(self, total_spend: float, days_inactive: int, satisfaction_score: int) -> dict:
        input_data = pd.DataFrame([{
            "TotalSpend": total_spend,
            "DaysInactive": days_inactive,
            "SatisfactionScore": satisfaction_score
        }])

        # Perform transformation and inference
        if self.model is not None:
            if hasattr(self.model, "predict"):
                if self.scaler:
                    scaled = self.scaler.transform(input_data)
                    features = self.pca.transform(scaled) if self.pca else scaled
                    cluster = int(self.model.predict(features)[0])
                else:
                    cluster = int(self.model.predict(input_data)[0])
            else:
                cluster = self._heuristic_fallback(total_spend, days_inactive, satisfaction_score)
        else:
            cluster = self._heuristic_fallback(total_spend, days_inactive, satisfaction_score)

        return self._map_cluster_to_persona(cluster, total_spend, days_inactive, satisfaction_score)

    def _heuristic_fallback(self, spend: float, days: int, rating: int) -> int:
        """Deterministic fallback if model files are missing or uninitialized."""
        if days > 30 or rating <= 2:
            return 0  # At-Risk
        elif spend >= 800 and days <= 15:
            return 1  # High-Value VIP
        elif spend >= 300 and days <= 30:
            return 2  # Loyal Regular
        else:
            return 3  # Low Engagement

    def _map_cluster_to_persona(self, cluster: int, spend: float, days: int, rating: int) -> dict:
        persona_map = {
            0: {
                "persona_title": "At-Risk Customer",
                "status_badge": "High Churn Probability",
                "description": "Customer exhibits high inactivity and low satisfaction ratings. Immediate re-engagement required.",
                "strategies": [
                    "Trigger automated win-back email sequence with 15% discount offer.",
                    "Assign customer success representative for direct outreach.",
                    "Send brief satisfaction survey to identify core friction points."
                ]
            },
            1: {
                "persona_title": "High-Value VIP",
                "status_badge": "Loyal Champion",
                "description": "Customer maintains high monetary spend and active interaction history.",
                "strategies": [
                    "Enroll in VIP loyalty tier for priority customer support.",
                    "Offer exclusive early access to upcoming product features.",
                    "Provide personalized loyalty rewards on milestone anniversaries."
                ]
            },
            2: {
                "persona_title": "Steady Regular",
                "status_badge": "Stable Retention",
                "description": "Consistent activity patterns with moderate spend and baseline satisfaction.",
                "strategies": [
                    "Promote cross-sell items based on purchase history.",
                    "Recommend annual subscription upgrades with cost savings incentives."
                ]
            },
            3: {
                "persona_title": "Low Engagement / Churned",
                "status_badge": "Dormant Profile",
                "description": "Minimal spend with prolonged periods of user inactivity.",
                "strategies": [
                    "Include in quarterly re-engagement marketing campaigns.",
                    "Send product update highlights and feature spotlight newsletters."
                ]
            }
        }

        persona = persona_map.get(cluster, persona_map[0])
        return {
            "cluster_id": cluster,
            "persona_title": persona["persona_title"],
            "status_badge": persona["status_badge"],
            "description": persona["description"],
            "strategies": persona["strategies"],
            "input_summary": {
                "Total Spend": f"${spend:,.2f}",
                "Days Inactive": f"{days} days",
                "Satisfaction": f"{rating} / 5 Stars"
            }
        }

predictor_service = ModelPredictor()
