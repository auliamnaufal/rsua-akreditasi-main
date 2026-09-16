# Notebook Update Summary

## Changes Made to `project-grading-kejadian-rs-new.ipynb`

### 1. **Cell 8: Model Loading & Evaluation**
**Previous Logic:**
- Trained multiple models using MultiOutputClassifier
- Saved best_model_final.pkl and separate task models
- Required full training pipeline execution

**New Logic:**
- Loads pre-trained separate models:
  - `best_model_SKP.pkl` (Pipeline: TF-IDF + LGBMClassifier)
  - `best_model_MDP_Violation.pkl` (XGBClassifier requiring embeddings)
- Automatically detects if model is Pipeline or classifier-only
- For classifier-only models: generates embeddings using IndoBERT
- Makes predictions on test set
- Evaluates performance (Accuracy, Precision, Recall, F1)
- Stores predictions in `y_pred_encoded` for downstream cells

**Key Parameters:**
- `MDP_EMBEDDING_MODEL = 'indolem/indobert-base-uncased'` (768 dimensions)

### 2. **Cell 9: Error Analysis**
**Updates:**
- Uses loaded models instead of training from scratch
- Works with `y_pred_encoded` from cell 8
- Generates confusion matrices for both SKP and MDP
- Saves error analysis to CSV file
- Compatible with separate model architecture

### 3. **Cell 11: Pattern Analysis**
**Updates:**
- Calculates Support, Confidence, Risk Prediction Accuracy
- Works with predictions from loaded models
- No dependency on training loop
- Analyzes both SKP and MDP patterns separately

## Model Architecture

### SKP Model (Pipeline)
```
Input: Raw text
  ↓
TF-IDF Vectorizer
  ↓
LGBMClassifier
  ↓
Output: SKP class (encoded)
```

### MDP Model (Classifier-only)
```
Input: Raw text
  ↓
IndoBERT Embeddings (768 dims)
  ↓
XGBClassifier
  ↓
Output: MDP class (encoded)
```

## Testing Results

✓ Models load successfully
✓ SKP predictions work (Pipeline handles text directly)
✓ MDP predictions work (Embeddings generated with IndoBERT)
✓ Both prediction paths tested and verified
✓ Workflow complete from data → predictions → evaluation

## Files Modified
- `/Users/auliamnaufal/Downloads/project-grading-kejadian-rs-new.ipynb`
  - Cell 8: Complete rewrite (model loading logic)
  - Cell 9: Updated (error analysis)
  - Cell 11: Updated (pattern analysis)

## Required Dependencies
- pandas, numpy
- scikit-learn
- xgboost, lightgbm
- torch, sentence-transformers
- matplotlib, seaborn

## Usage Notes

1. **Model Inputs:**
   - SKP model accepts raw text directly
   - MDP model requires IndoBERT embeddings (automatically generated)

2. **File Paths (adjust for your environment):**
   - Training data: `/kaggle/input/data-rs/data_train_augmented.csv`
   - Test data: `/kaggle/input/data-rs/data_test_original.csv`
   - SKP model: `/kaggle/input/data-rs/best_model_SKP.pkl`
   - MDP model: `/kaggle/input/data-rs/best_model_MDP_Violation.pkl`

3. **Embedding Model:**
   - MDP uses IndoBERT (768 features)
   - Change `MDP_EMBEDDING_MODEL` variable if using different embeddings
